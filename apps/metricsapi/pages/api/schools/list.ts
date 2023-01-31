import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from './../../../models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import NextCors from 'nextjs-cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Schools } = await dbCon();
      const schools = await Schools.find({ enabled: true }).catch(catcher);
      if (schools) {
        res.status(200).json({
          status: true,
          schools: schools,
        });
      } else {
        res.status(404).json({ status: false, err: 'Schools not found' });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};
