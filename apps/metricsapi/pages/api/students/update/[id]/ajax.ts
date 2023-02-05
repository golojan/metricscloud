import { ResponseFunctions } from '@metricsai/metrics-interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon, allowCors } from '../../../../../models';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const { membershipType, isPHD, isPGD } = req.body;
      const { Accounts } = await dbCon();
      console.log(req.body);

      const updated = await Accounts.updateOne(
        { _id: id },
        {
          membershipType: membershipType,
          isPHD: isPHD,
          isPGD: isPGD,
        },
      );
      console.log(id);
      if (updated) {
        res.status(200).json({
          status: true,
          ...updated,
        });
      } else {
        res.status(400).json({ status: false, error: 'No Profile updated' });
      }
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(404).json({ status: false, err: 'Only POST Method is allowed' });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};

export default allowCors(handler);
