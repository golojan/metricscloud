
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from './../../../models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { getCookie } from 'cookies-next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const domain = getCookie('domain', { req, res });
      const { Lecturers } = await dbCon();
      const count = await Lecturers.countDocuments({ domain: domain }).catch(catcher);
      if (count) {
        res.status(200).json({ status: true, count });
      } else {
        res.status(400).json({ status: false, err: 'Failed to get count' });
      }
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only GET Method is allowed' });
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};

export default allowCors(handler);
;
