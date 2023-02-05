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
      const { Schools } = await dbCon();
      const school = await Schools.findOne({ _id: schoolId }).catch(catcher);
      if (school) {
        res.status(200).json({
          status: true,
          data: school,
        });
      } else {
        res.status(404).json({ status: false, err: 'Account not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};

export default allowCors(handler);
;
