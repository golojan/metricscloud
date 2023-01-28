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
      return;
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { postFeedId, fromUser, toUser, comment } = req.body;
      console.log(req.body);
      const { PostFeedComments } = await dbCon();
      const created = await PostFeedComments.create({
        postFeedId: postFeedId,
        fromUser: fromUser,
        toUser: toUser,
        comment: comment,
      }).catch(catcher);
      if (created) {
        res.status(200).json({
          status: true,
          data: created,
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
