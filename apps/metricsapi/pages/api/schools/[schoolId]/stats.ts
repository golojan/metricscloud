import {
  AccountTypes,
  MembershipTypes,
  ResponseFunctions,
  SchoolSettingsType,
  Gender,
} from '@metricsai/metrics-interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from './../../../../models';

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

      // get school info for settings //
      const school = await Schools.findById(schoolId).catch(catcher);
      let SETTINGS: SchoolSettingsType = {};
      if (school) {
        SETTINGS = school.settings ? school.settings : {};
      }

      const gs_results = await Accounts.aggregate([
        { $match: { schoolId: String(schoolId) } },
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
            totalFemaleStudents: {
              $sum: {
                $cond: [
                  {
                    $and: [{ $eq: ['$accountType', AccountTypes.STUDENT] }, { $eq: ['$gender', Gender.FEMALE] }],
                  },
                  1,
                  0,
                ],
              },
            },
            totalLecturers: {
              $sum: {
                $cond: [{ $eq: ['$accountType', AccountTypes.LECTURER] }, 1, 0],
              },
            },
            totalFemaleLecturers: {
              $sum: {
                $cond: [
                  {
                    $and: [{ $eq: ['$accountType', AccountTypes.LECTURER] }, { $eq: ['$gender', Gender.FEMALE] }],
                  },
                  1,
                  0,
                ],
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
            lecturerStudentRatio: {
              $cond: {
                if: { $or: [{ $eq: ['$totalLecturers', 0] }, { $eq: ['$totalStudents', 0] }] },
                then: 0,
                else: { $multiply: [{ $divide: ['$totalLecturers', '$totalStudents'] }, 100] },
              },
            },
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
            totalFemaleStudents: 1,
            totalFemaleLecturers: 1,
            percentageFemaleStudents: {
              $cond: {
                if: { $or: [{ $eq: ['$totalStudents', 0] }, { $eq: ['$totalFemaleStudents', 0] }] },
                then: 0,
                else: { $multiply: [{ $divide: ['$totalFemaleStudents', '$totalStudents'] }, 100] },
              },
            },
            percentageFemaleLecturers: {
              $cond: {
                if: { $or: [{ $eq: ['$totalLecturers', 0] }, { $eq: ['$totalFemaleLecturers', 0] }] },
                then: 0,
                else: { $multiply: [{ $divide: ['$totalFemaleLecturers', '$totalLecturers'] }, 100] },
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
            lecturerStudentRatio: 1,
            firstPublicationYear: 1,
            citationsPerCapita: 1,
            hindexPerCapita: 1,
            i10hindexPerCapita: 1,
            totalFemaleStudents: 1,
            totalFemaleLecturers: 1,
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
            percentageFemaleStudents: 1,
            percentageFemaleLecturers: 1,
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
};

export default allowCors(handler);
