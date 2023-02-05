import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from './../../../../../../../../models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { departmentId } = req.query;

      const { SchoolDepartments } = await dbCon();
      const removed = await SchoolDepartments.findOneAndRemove({
        _id: departmentId,
      }).catch(catcher);
      if (removed) {
        res.status(200).json({
          status: true,
          ...removed,
        });
      } else {
        res.status(404).json({ status: false, err: 'Department deletion failed' });
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only POST Method is allowed' });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};

export default allowCors(handler);
;
