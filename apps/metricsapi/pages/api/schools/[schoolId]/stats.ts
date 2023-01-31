import { AccountTypes, MembershipTypes, ResponseFunctions, SchoolSettingsType } from '@metricsai/metrics-interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from './../../../../models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only GET Method is allowed' });
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
            totalLecturers: {
              $sum: {
                $cond: [{ $eq: ['$accountType', AccountTypes.LECTURER] }, 1, 0],
              },
            },
            totalAlumni: {
              $sum: {
                $cond: [{ $eq: ['$accountType', AccountTypes.ALUMNI] }, 1, 0],
              },
            },
            lecturerStudentRatios: {
              $push: {
                $cond: [{ $eq: ['$accountType', AccountTypes.STUDENT] }, '$lecturerStudentRatio', null],
              },
            },
            totalInternalStaff: {
              $sum: {
                $cond: [{ $eq: ['$membershipType', MembershipTypes.INTERNATIONAL] }, 1, 0],
              },
            },
            totalInternationalStudents: {
              $sum: {
                $cond: [{ $eq: ['$membershipType', MembershipTypes.INTERNATIONAL] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            _id: '$_id',
            totalCitations: 1,
            totalPublications: 1,
            totalHIndex: 1,
            totalI10Index: 1,
            totalAccounts: 1,
            totalStudents: 1,
            totalLecturers: 1,
            totalAlumni: 1,
            totalInternalStaff: 1,
            totalInternationalStudents: 1,
            firstPublicationYear: {
              $ifNull: [
                {
                  $min: {
                    $filter: {
                      input: '$firstPublicationYear',
                      cond: { $gt: ['$$this', 0] },
                    },
                  },
                },
                {
                  $subtract: [{ $year: new Date() }, 4],
                },
              ],
            },
            citationsPerCapita: {
              $cond: {
                if: {
                  $or: [{ $eq: ['$totalCitations', 0] }, { $eq: ['$totalPublications', 0] }],
                },
                then: 0,
                else: {
                  $divide: ['$totalCitations', '$totalPublications'],
                },
              },
            },
            hindexPerCapita: {
              $divide: [
                '$totalPublications',
                {
                  $ifNull: [
                    {
                      $min: {
                        $filter: {
                          input: '$firstPublicationYear',
                          cond: { $gt: ['$$this', 0] },
                        },
                      },
                    },
                    {
                      $subtract: [{ $year: new Date() }, 4],
                    },
                  ],
                },
              ],
            },
            i10hindexPerCapita: {
              $divide: [
                '$totalPublications',
                {
                  $ifNull: [
                    {
                      $min: {
                        $filter: {
                          input: '$firstPublicationYear',
                          cond: { $gt: ['$$this', 0] },
                        },
                      },
                    },
                    {
                      $subtract: [{ $year: new Date() }, 4],
                    },
                  ],
                },
              ],
            },
            totalStaffWithOutGooglePresence: {
              $cond: {
                if: {
                  $or: [{ $eq: ['$totalCitations', 0] }, { $eq: ['$totalHIndex', 0] }, { $eq: ['$totalI10Index', 0] }],
                },
                then: 1,
                else: 0,
              },
            },
            totalStaffWithGooglePresence: {
              $sum: {
                $cond: {
                  if: {
                    $or: [
                      { $gt: ['$totalCitations', 0] },
                      { $gt: ['$totalHIndex', 0] },
                      { $gt: ['$totalI10Index', 0] },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            schoolId: '$_id',
            totalCitations: 1,
            totalPublications: 1,
            totalHIndex: 1,
            totalI10Index: 1,
            totalAccounts: 1,
            totalStudents: 1,
            totalLecturers: 1,
            totalAlumni: 1,
            totalInternalStaff: 1,
            totalInternationalStudents: 1,
            firstPublicationYear: 1,
            citationsPerCapita: 1,
            hindexPerCapita: 1,
            i10hindexPerCapita: 1,
            percentageOfStaffWithGooglePresence: {
              $cond: {
                if: {
                  $eq: ['$totalStaffWithGooglePresence', 0],
                },
                then: 0,
                else: {
                  $multiply: [{ $divide: ['$totalStaffWithGooglePresence', '$totalLecturers'] }, 100],
                },
              },
            },
            percentageOfInternationalStaff: {
              $cond: {
                if: {
                  $eq: ['$totalInternalStaff', 0],
                },
                then: 0,
                else: {
                  $multiply: [{ $divide: ['$totalInternalStaff', '$totalLecturers'] }, 100],
                },
              },
            },
            percentageOfInternationalStudents: {
              $cond: {
                if: {
                  $eq: ['$totalInternationalStudents', 0],
                },
                then: 0,
                else: {
                  $multiply: [{ $divide: ['$totalInternationalStudents', '$totalStudents'] }, 100],
                },
              },
            },
            total: {
              $avg: ['$citationsPerCapita', '$hindexPerCapita', '$i10hindexPerCapita'],
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
