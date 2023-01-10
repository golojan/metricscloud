import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon } from '@metricsai/metrics-models';
import { getDomain } from '@metricsai/metrics-utils';
import mongoose from 'mongoose';

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

      const { Accounts, Schools } = await dbCon();

      // Try capture domain //
      const { host } = req.headers;
      const domain: string = getDomain(host as string);
      // Try capture domain //

      // Get the School info with domain //
      const school = await Schools.findOne({
        domain: domain,
      }).catch(catcher);
      if (school) {
        // Get the School info with domain //
        await Accounts.findOne({
          email: username,
          schoolid: school._id,
        })
          .then((account) => {
            if (account) {
              const isPasswordValid = bcrypt.compareSync(
                password,
                account.password
              );
              if (isPasswordValid) {
                res
                  .status(200)
                  .json({ status: true, token: account._id, domain: domain });
              } else {
                res.status(400).json({ status: false, domain: domain });
              }
            } else {
              res.status(400).json({ status: false, domain: domain });
            }
          })
          .catch(catcher);
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
