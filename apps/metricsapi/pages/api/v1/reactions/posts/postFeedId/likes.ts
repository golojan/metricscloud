import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import {
  PostFeedTypes,
  ResponseFunctions,
} from '@metricsai/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    //
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
      return;
    },
    //
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      // get the postFeedId from the query
      const { postFeedId } = req.query;
      const { UserReactions } = await dbCon();

      // get all likes for the comment
      const likes = await UserReactions.find({
        postFeedId: postFeedId,
        like: true,
        feedType: PostFeedTypes.POST,
      }).catch(catcher);

      if (likes) {
        res.status(200).json({
          status: true,
          data: likes,
        });
        return;
      } else {
        res.status(404).json({ status: false, err: 'Error getting likes' });
        return;
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
