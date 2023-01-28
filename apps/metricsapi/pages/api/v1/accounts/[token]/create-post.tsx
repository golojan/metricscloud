import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon } from '@metricsai/metrics-models';
const bcrypt = require('bcryptjs');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { accountId, schoolId, type, post } = req.body;
      const { PostFeeds } = await dbCon();
      const created = await PostFeeds.create({
        accountId: token,
        content: post,
        schoolId: schoolId,
        type: type,
      }).catch(catcher);
      if (created) {
        res.status(200).json({
          status: true,
          data: created,
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
