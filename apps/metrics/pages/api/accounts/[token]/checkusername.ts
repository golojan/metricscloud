import { NextApiRequest, NextApiResponse } from "next";

import { ResponseFunctions } from '@metrics/metrics-interfaces';
import { dbCon } from '@metricsai/metrics-models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;

      const { Accounts } = await dbCon();
      await Accounts.findOne({
        username: token,
      })
        .then((account) => {
          if (account) {
            res
              .status(200)
              .json({
                status: true,
                _id: account._id,
                error: "Username Exists",
              });
            return;
          } else {
            res
              .status(400)
              .json({ status: false, error: "Username does not exist" });
            return;
          }
        })
        .catch(catcher);
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}
