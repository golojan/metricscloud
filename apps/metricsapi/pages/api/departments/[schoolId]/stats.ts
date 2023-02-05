import { Gender, LecturerType } from '@metricsai/metrics-interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from './../../../../models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const { SchoolDepartments } = await dbCon();
      const departments = await SchoolDepartments.aggregate([
        {
          $match: {
            schoolId: String(schoolId),
          },
        },
        {
          $group: {
            _id: 0,
            totalDepartments: { $sum: 1 },
            fullAccreditation: {
              $sum: {
                $cond: [{ $eq: ['$fullAccreditation', true] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalDepartments: 1,
            fullAccreditation: 1,
          },
        },
      ]).catch(catcher);

      res.status(200).json({
        status: true,
        ...departments[0],
      });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};

export default allowCors(handler);
;
