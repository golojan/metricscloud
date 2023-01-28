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
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only POST Method is allowed' });
      return;
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { postFeedId, commentId, fromUser, toUser } = req.body;
      const { UserReactions } = await dbCon();
      // check if the user has already liked the comment and unlike it if true else create a new like for the comment and return it to the user
      const alreadyLiked = await UserReactions.findOne({
        feedType: PostFeedTypes.COMMENT,
        postFeedId: postFeedId,
        commentId: commentId,
        fromUser: fromUser,
        toUser: toUser,
        like: true,
      }).catch(catcher);

      if (alreadyLiked) {
        // if the user has already liked the comment, then unlike it
        const unliked = await UserReactions.findOneAndDelete({
          feedType: PostFeedTypes.COMMENT,
          postFeedId: postFeedId,
          commentId: commentId,
          fromUser: fromUser,
          toUser: toUser,
          like: true,
        }).catch(catcher);

        if (unliked) {
          res.status(200).json({
            status: true,
            like: false,
            data: unliked,
          });
          return;
        } else {
          res
            .status(404)
            .json({ status: false, err: 'Error unliking comment' });
          return;
        }
      } else {
        // Create new like for the comment
        const created = await UserReactions.create({
          feedType: PostFeedTypes.COMMENT,
          postFeedId: postFeedId,
          commentId: commentId,
          fromUser: fromUser,
          toUser: toUser,
          like: true,
        }).catch(catcher);

        if (created) {
          res.status(200).json({
            status: true,
            like: true,
            data: created,
          });
          return;
        } else {
          res.status(404).json({ status: false, err: 'Error Liking comment' });
          return;
        }
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
