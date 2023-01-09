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
      const { shortname, indicator, criteria, weight, multiplier } =
        await req.body;
      const { Indicators } = await dbCon();
      const saved = await Indicators.updateOne(
        { _id: id },
        {
          shortname: shortname,
          indicator: indicator,
          criteria: criteria,
          weight: weight,
          multiplier: multiplier,
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
