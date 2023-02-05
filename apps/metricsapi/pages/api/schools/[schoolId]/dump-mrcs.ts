import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from '../../../../models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import nextCookie from 'next-cookies';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only POST Method is allowed' });
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const { mrcsData } = req.body;

      const { MRCs } = await dbCon();
      const saved = await MRCs.insertMany(mrcsData).catch(catcher);

      console.log({ saved });

      if (saved) {
        res.status(200).json({
          status: true,
          ...saved,
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
