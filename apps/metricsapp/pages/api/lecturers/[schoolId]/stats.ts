import {
  Gender,
  ResponseFunctions,
  AccountTypes,
  MembershipTypes,
  SchoolSettingsType,
} from '@metricsai/metrics-interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import {
  citationByWeight,
  hindexByWeight,
  i10indexByWeight,
} from '@metricsai/metrics-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const { Accounts, Schools } = await dbCon();

      const school = await Schools.findById(schoolId).catch(catcher);
      let SETTINGS: SchoolSettingsType = {};
      if (school) {
        SETTINGS = school.settings ? school.settings : {};
      }

      const lecturers = await Accounts.aggregate([
        {
          $match: {
            schoolId: schoolId,
            accountType: AccountTypes.LECTURER,
          },
        },
        {
          $group: {
            _id: '$_id',
            citations: { $sum: '$citations' },
            hindex: { $sum: '$hindex' },
            i10hindex: { $sum: '$i10hindex' },
            totalPublications: { $sum: '$totalPublications' },
            firstPublicationYear: { $min: '$firstPublicationYear' },
            lastPublicationYear: { $max: '$lastPublicationYear' },
            highestCitations: { $max: '$citations' },
            highestHindex: { $max: '$hindex' },
            highestI10hindex: { $max: '$i10hindex' },
            highestTotalPublications: { $max: '$totalPublications' },
            lowestCitations: { $min: '$citations' },
            lowestHindex: { $min: '$hindex' },
            lowestI10hindex: { $min: '$i10hindex' },
            lowestTotalPublications: { $min: '$totalPublications' },
            totalStaff: { $sum: 1 },
            totalStaffWithGooglePresence: {
              $sum: {
                $cond: [
                  {
                    $or: [
                      { $gt: ['$citations', 0] },
                      { $gt: ['$hindex', 0] },
                      { $gt: ['$i10hindex', 0] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            totalStaffWithOutGooglePresence: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ['$citations', 0] },
                      { $eq: ['$hindex', 0] },
                      { $eq: ['$i10hindex', 0] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            internationalStaff: {
              $sum: {
                $cond: [
                  { $eq: ['$membershipType', MembershipTypes.INTERNATIONAL] },
                  1,
                  0,
                ],
              },
            },
            localStaff: {
              $sum: {
                $cond: [
                  { $eq: ['$membershipType', MembershipTypes.LOCAL] },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: 'lecturers',
            localField: '_id',
            foreignField: '_id',
            as: 'lecturers',
          },
        },
        {
          $project: {
            firstPublicationYear: 1,
            lastPublicationYear: 1,
            citations: 1,
            hindex: 1,
            i10index: 1,
            citationsPerCapita: {
              $divide: [
                '$citations',
                {
                  $subtract: [
                    new Date().getFullYear(),
                    '$firstPublicationYear',
                  ],
                },
              ],
            },
          },
        },
      ]).catch(catcher);

      if (lecturers[0]) {
        res.status(200).json({
          status: true,
          count: lecturers[0].totalStaff,
          citations: lecturers[0].citations,
          hindex: lecturers[0].hindex,
          i10hindex: lecturers[0].i10hindex,
          totalPublications: lecturers[0].totalPublications,
          firstPublicationYear: lecturers[0].firstPublicationYear,
          lastPublicationYear: lecturers[0].lastPublicationYear,
          totalStaff: lecturers[0].totalStaff,
          totalStaffWithGooglePresence:
            lecturers[0].totalStaffWithGooglePresence,
          totalStaffWithOutGooglePresence:
            lecturers[0].totalStaffWithOutGooglePresence,
          internationalStaff: lecturers[0].internationalStaff,
          localStaff: lecturers[0].localStaff,
          highestCitations: lecturers[0].highestCitations,
          highestHindex: lecturers[0].highestHindex,
          highestI10hindex: lecturers[0].highestI10hindex,
          highestTotalPublications: lecturers[0].highestTotalPublications,
          lowestCitations: lecturers[0].lowestCitations,
          lowestHindex: lecturers[0].lowestHindex,
          lowestI10hindex: lecturers[0].lowestI10hindex,
          lowestTotalPublications: lecturers[0].lowestTotalPublications,
          perCapitaAllCitations: citationByWeight(
            lecturers[0].citations,
            lecturers[0].totalPublications,
            lecturers[0].highestCitations,
            SETTINGS.citationsWeight
          ).toFixed(1),
          perCapitaAllHindex: hindexByWeight(
            lecturers[0].hindex,
            lecturers[0].firstPublicationYear,
            lecturers[0].highestHindex,
            SETTINGS.hindexWeight
          ).toFixed(1),
          perCapitaAllI10hindex: i10indexByWeight(
            lecturers[0].i10hindex,
            lecturers[0].firstPublicationYear,
            lecturers[0].highestI10hindex,
            SETTINGS.i10hindexWeight
          ).toFixed(1),
        });
      } else {
        res
          .status(400)
          .json({ status: false, error: 'No Statistics returned' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
