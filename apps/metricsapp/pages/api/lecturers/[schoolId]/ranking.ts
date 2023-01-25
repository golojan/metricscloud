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
          },
        },
        {
          $project: {
            schoolId: 1,
            username: 1,
            email: 1,
            mobile: 1,
            fullname: {
              $concat: ['$firstname', ' ', '$lastname'],
            },
            citations: 1,
            hindex: 1,
            i10index: 1,
            firstPublicationYear: 1,
            lastPublicationYear: 1,
            totalPublications: 1,
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
}
