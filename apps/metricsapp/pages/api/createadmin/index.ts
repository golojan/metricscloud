import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon } from '@metricsai/metrics-models';

import bcrypt  from 'bcryptjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Schools, Accounts } = await dbCon();

      console.log('Creating School');

      const created = await Schools.create({
        domain: 'localhost',
        name: 'Enug State University, ESUT',
        shortname: 'ESUT',
      }).catch(catcher);
      if (created) {
        // Encrypt Password//
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync('admin', salt);
        // Encrypt Password//
        const account = await Accounts.create({
          schoolid: created._id,
          email: 'agu.chux@yahoo.com',
          firstname: 'Agu',
          lastname: 'Chux',
          mobile: '07068573376',
          enabled: true,
          password: hashedPassword,
        }).catch(catcher);

        if (account) {
          res.status(200).json({
            status: true,
            accid: account._id,
            schoolid: created._id,
          });
        } else {
          res
            .status(400)
            .json({ status: false, err: 'Failed to create Account' });
        }
      } else {
        res.status(400).json({ status: false, err: 'Failed to create School' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
