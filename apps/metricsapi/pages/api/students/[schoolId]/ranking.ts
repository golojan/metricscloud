import { ResponseFunctions, AccountTypes, SchoolSettingsType } from '@metricsai/metrics-interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from './../../../../models';
import { citationByWeight, hindexByWeight, i10indexByWeight } from '@metricsai/metrics-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const { Accounts, Schools } = await dbCon();

      const school = await Schools.findById(schoolId).catch(catcher);
      let SETTINGS: SchoolSettingsType = {};
      if (school) {
        SETTINGS = school.settings ? school.settings : {};
      }

      const statistics = await Accounts.aggregate([
        {
          $match: {
            schoolId: schoolId,
          },
        },
        {
          $group: {
            _id: '$schoolId',
            totalLecturers: { $sum: 1 },
            maxPublications: { $max: '$totalPublications' },
            maxCitations: { $max: '$citations' },
            maxHindex: { $max: '$hindex' },
            maxI10hindex: { $sum: '$i10hindex' },
          },
        },
      ]).catch(catcher);

      const lecturers = await Accounts.aggregate([
        {
          $match: {
            schoolId: schoolId,
            accountType: AccountTypes.STUDENT,
          },
        },
        {
          $project: {
            schoolId: 1,
            picture: 1,
            username: 1,
            email: 1,
            mobile: 1,
            firstname: 1,
            lastname: 1,
            googlePresence: 1,
            firstPublicationYear: 1,
            lastPublicationYear: 1,
            totalPublications: 1,
            searchMetadata: 1,
            fullname: {
              $concat: ['$firstname', ' ', '$lastname'],
            },
            citations: 1,
            hindex: 1,
            i10hindex: 1,
            citationsPerCapita: {
              $cond: {
                if: {
                  $or: [{ $eq: ['$citations', 0] }, { $eq: ['$totalPublications', 0] }],
                },
                then: 0,
                else: {
                  $divide: ['$citations', '$totalPublications'],
                },
              },
            },
            hindexPerCapita: {
              $cond: {
                if: {
                  $or: [{ $eq: ['$hindex', 0] }, { $eq: ['$firstPublicationYear', 0] }],
                },
                then: 0,
                else: {
                  $divide: ['$hindex', { $subtract: [{ $year: new Date() }, '$firstPublicationYear'] }],
                },
              },
            },
            i10hindexPerCapita: {
              $cond: {
                if: {
                  $or: [{ $eq: ['$i10hindex', 0] }, { $eq: ['$firstPublicationYear', 0] }],
                },
                then: 0,
                else: {
                  $divide: ['$i10hindex', { $subtract: [{ $year: new Date() }, '$firstPublicationYear'] }],
                },
              },
            },
          },
        },
      ]);

      if (lecturers) {
        res.status(200).json({
          status: true,
          data: lecturers,
        });
      } else {
        return res.status(400).json({ status: false, error: 'No Statistics returned' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};

export default allowCors(handler);