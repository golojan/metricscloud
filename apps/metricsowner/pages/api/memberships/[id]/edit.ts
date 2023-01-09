import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only POST Method is allowed' });
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { id } = req.query;
      const { membership, description } = await req.body;
      const { Memberships } = await dbCon();
      const saved = await Memberships.updateOne(
        { _id: id },
        {
          membership: membership,
          description: description,
        }
      ).catch(catcher);
      if (saved) {
        res.status(200).json({
          status: true,
          data: saved,
        });
      } else {
        res.status(404).json({ status: false, err: 'Account not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
