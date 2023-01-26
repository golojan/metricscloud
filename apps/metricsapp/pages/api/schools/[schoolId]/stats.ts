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

      let matchQuery = {};

      // set match query based on includeStudentsInMetrics and includeLecturersInMetrics and includeAlumniInMetrics //
      if (SETTINGS.includeAlumniInMetrics && lecturersInMetrics && alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
        };
      } else if (studentsInMetrics && lecturersInMetrics && !alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
          accountType: { $ne: AccountTypes.ALUMNI },
        };
      } else if (studentsInMetrics && !lecturersInMetrics && alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
          accountType: { $ne: AccountTypes.LECTURER },
        };
      } else if (studentsInMetrics && !lecturersInMetrics && !alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
          accountType: { $nin: [AccountTypes.LECTURER, AccountTypes.ALUMNI] },
        };
      } else if (!studentsInMetrics && lecturersInMetrics && alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
          accountType: { $ne: AccountTypes.STUDENT },
        };
      } else if (!studentsInMetrics && lecturersInMetrics && !alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
          accountType: { $nin: [AccountTypes.STUDENT, AccountTypes.ALUMNI] },
        };
      } else if (!studentsInMetrics && !lecturersInMetrics && alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
          accountType: { $nin: [AccountTypes.STUDENT, AccountTypes.LECTURER] },
        };
      } else if (!studentsInMetrics && !lecturersInMetrics && !alumniInMetrics) {
        matchQuery = {
          schoolId: schoolId,
          accountType: {
            $nin: [AccountTypes.STUDENT, AccountTypes.LECTURER, AccountTypes.ALUMNI],
          },
        };
      } else {
        matchQuery = {
          schoolId: schoolId,
          accountType: {
            $nin: [AccountTypes.STUDENT, AccountTypes.LECTURER, AccountTypes.ALUMNI],
          },
        };
      }

      const gs_results = await Accounts.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: '$schoolId',
            totalCitations: { $sum: '$citations' },
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
