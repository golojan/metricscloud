import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const {
        facultyId,
        departmentId,
        departmentName,
        departmentCode,
        departmentDescription,
      } = req.body;

      console.log(req.body);

      const { SchoolDepartments } = await dbCon();

      const department = await SchoolDepartments.findOne({
        schoolId: schoolId,
        departmentId: departmentId,
        facultyId: facultyId,
      }).catch(catcher);
      if (department) {
        res.status(200).json({
          status: true,
          ...department,
        });
      } else {
        const created = await SchoolDepartments.create({
          schoolId: schoolId,
          facultyId: facultyId,
          departmentId: departmentId,
          departmentName: departmentName,
          departmentCode: departmentCode,
          departmentDescription: departmentDescription
            ? departmentDescription
            : '',
        }).catch(catcher);
        if (created) {
          res.status(200).json({
            status: true,
            ...created,
          });
        } else {
          res
            .status(404)
            .json({ status: false, err: 'Faculty creation failed' });
        }
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only POST Method is allowed' });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
