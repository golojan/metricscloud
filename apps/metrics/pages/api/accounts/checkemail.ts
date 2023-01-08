import { NextApiRequest, NextApiResponse } from "next";
import { dbCon } from '@metrics/metrics-models';
import { ResponseFunctions } from '@metrics/metrics-interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { email } = req.body;
      const { Accounts } = await dbCon();
      await Accounts.findOne({
        email: email,
      })
        .then((account) => {
          if (account) {
            res.status(200).json({ status: true, error: "Email Exists" });
            return;
          } else {
            res.status(400).json({ status: false, error: "Email id free" });
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
