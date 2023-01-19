import { AccountTypes, ResponseFunctions } from '@metricsai/metrics-interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { $CombinedState } from 'redux';

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
      const schoolInfo = await Schools.findOne({ _id: schoolId }).catch(
        catcher
      );

      const studentsInMetrics = schoolInfo.settings?.includeStudentsInMetrics;
      const lecturersInMetrics = schoolInfo.settings?.includeLecturersInMetrics;
      const alumniInMetrics = schoolInfo.settings?.includeAlumniInMetrics;

      let matchQuery = {};

      // set match query based on includeStudentsInMetrics and includeLecturersInMetrics and includeAlumniInMetrics //
      if (studentsInMetrics && lecturersInMetrics && alumniInMetrics) {
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
      } else if (
        !studentsInMetrics &&
        !lecturersInMetrics &&
        !alumniInMetrics
      ) {
        matchQuery = {
          schoolId: schoolId,
          accountType: {
            $nin: [
              AccountTypes.STUDENT,
              AccountTypes.LECTURER,
              AccountTypes.ALUMNI,
            ],
          },
        };
      } else {
        matchQuery = {
          schoolId: schoolId,
          accountType: {
            $nin: [
              AccountTypes.STUDENT,
              AccountTypes.LECTURER,
              AccountTypes.ALUMNI,
            ],
          },
        };
      }

      const gs_results = await Accounts.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: '$schoolId',
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
          },
        },
      ]).catch(catcher);

      if (gs_results[0]) {
        res.status(200).json({
          status: true,
          citations: gs_results[0].citations,
          hindex: gs_results[0].hindex,
          i10hindex: gs_results[0].i10hindex,
          totalPublications: gs_results[0].totalPublications,
          firstPublicationYear: gs_results[0].firstPublicationYear,
          lastPublicationYear: gs_results[0].lastPublicationYear,
          totalStaff: gs_results[0].totalStaff,
          totalStaffWithGooglePresence:
            gs_results[0].totalStaffWithGooglePresence,
          totalStaffWithOutGooglePresence:
            gs_results[0].totalStaffWithOutGooglePresence,
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
