import {
  AccountTypes,
  ResponseFunctions,
  SchoolSettingsType,
} from '@metricsai/metrics-interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';

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

      // get school info for settings //
      const school = await Schools.findById(schoolId).catch(catcher);
      
      let SETTINGS: SchoolSettingsType = {};

      let studentsInMetrics = false;
      let lecturersInMetrics = false;
      let alumniInMetrics = false;

      if (school) {
        SETTINGS = school.settings ? school.settings : {};
        if (SETTINGS) {
          studentsInMetrics = SETTINGS.includeStudentsInMetrics as boolean;
          lecturersInMetrics = SETTINGS.includeLecturersInMetrics as boolean;
          alumniInMetrics = SETTINGS.includeAlumniInMetrics as boolean;
        }
      }

      let matchQuery: {
        schoolId?: string;
        accountType?: {
          $in: AccountTypes[];
        };
      } = { schoolId: String(schoolId) };

      // set match query based on includeStudentsInMetrics and includeLecturersInMetrics and includeAlumniInMetrics //
      if (alumniInMetrics && studentsInMetrics) {
        matchQuery = {
          ...matchQuery,
          accountType: {
            $in: [AccountTypes.LECTURER, AccountTypes.STUDENT, AccountTypes.ALUMNI],
          },
        };
      } else if (alumniInMetrics && !studentsInMetrics) {
        matchQuery = {
          ...matchQuery,
          accountType: {
            $in: [AccountTypes.LECTURER, AccountTypes.ALUMNI],
          },
        };
      } else if (!alumniInMetrics && studentsInMetrics) {
        matchQuery = {
          ...matchQuery,
          accountType: {
            $in: [AccountTypes.LECTURER, AccountTypes.STUDENT],
          },
        };
      } else {
        matchQuery = {
          ...matchQuery,
          accountType: {
            $in: [AccountTypes.LECTURER],
          },
        };
      }

      const gs_results = await Accounts.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: '$schoolId',
            totalCitations: { $sum: '$citations' },
            totalPublications: { $sum: '$totalPublications' },
            totalHIndex: { $sum: '$hindex' },
            totalI10Index: { $sum: '$i10hindex' },
            totalAccounts: { $sum: 1 },
            totalStudents: {
              $sum: {
                $cond: [{ $eq: ['$accountType', AccountTypes.STUDENT] }, 1, 0],
              },
            },
          },
        },
      ]).catch(catcher);

      if (gs_results[0]) {
        res.status(200).json({
          status: true,
          ...gs_results[0],
        });
      } else {
        res.status(400).json({ status: false, error: 'No Statistics returned' });
      }

    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
