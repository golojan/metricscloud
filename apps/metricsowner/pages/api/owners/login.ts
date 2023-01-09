import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon } from '@metricsai/metrics-models';

const bcrypt = require('bcryptjs');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { username, password } = req.body;

      const { Owners } = await dbCon();

      // Get the School info with domain //
      await Owners.findOne({
        email: username,
      })
        .then((account) => {
          if (account) {
            const isPasswordValid = bcrypt.compareSync(
              password,
              account.password
            );
            if (isPasswordValid) {
              res.status(200).json({ status: true, token: account._id });
            } else {
              res.status(400).json({ status: false });
            }
          } else {
            res.status(400).json({ status: false });
          }
        })
        .catch(catcher);
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
