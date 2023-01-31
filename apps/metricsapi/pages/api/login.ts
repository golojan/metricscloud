import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon, allowCors } from './../../models';
import { getDomain } from '@metricsai/metrics-utils';

import bcrypt from 'bcryptjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { username, password, domain } = req.body;
      const { Accounts, Schools } = await dbCon();

      // Get the School info with domain //
      const school = await Schools.findOne({
        domain: domain,
      }).catch(catcher);

      if (school) {
        // Get the School info with domain //
        await Accounts.findOne({
          email: username,
          schoolId: school._id,
        })
          .then((account) => {
            if (account._id) {
              const isPasswordValid = bcrypt.compareSync(password, account.password);
              if (isPasswordValid) {
                res.status(200).json({
                  status: true,
                  token: account._id,
                  username: account.username,
                  domain: domain,
                  schoolId: account.schoolId,
                });
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
};

export default allowCors(handler);