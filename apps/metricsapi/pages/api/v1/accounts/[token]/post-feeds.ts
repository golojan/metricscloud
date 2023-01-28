import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: false, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { PostFeeds } = await dbCon();
      const posts = await PostFeeds.find({ accountId: token })
        .sort({ createdAt: -1 })
        .catch(catcher);
      if (posts) {
        res.status(200).json({
          status: true,
          data: posts,
        });
        return;
      } else {
        res.status(400).json({ status: false, error: 'Account not found' });
        return;
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else
    res
      .status(400)
      .json({ status: false, error: 'No Response for This Request' });
}
