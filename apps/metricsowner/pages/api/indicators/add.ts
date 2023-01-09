import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { shortname, indicator, criteria, weight, multiplier } =
        await req.body;
      const { Indicators } = await dbCon();
      await Indicators.create({
        shortname: shortname,
        indicator: indicator,
        criteria: criteria,
        weight: weight,
        multiplier: multiplier,
      })
        .then((created) => {
          res.status(200).json({ status: true, created: created });
        })
        .catch(catcher);
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
