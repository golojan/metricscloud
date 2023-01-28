import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
      return;
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { postFeedId } = req.query;
      const { PostFeedComments } = await dbCon();
      const comments = await PostFeedComments.find({
        postFeedId: postFeedId,
      })
        .sort({ createdAt: -1 })
        .catch(catcher);
      if (comments) {
        res.status(200).json({
          status: true,
          comments: comments,
        });
        return;
      } else {
        res.status(404).json({ status: false, err: 'Schools not found' });
        return;
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}