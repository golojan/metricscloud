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
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Owners } = await dbCon();

      // Encrypt Password//
      const salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync('admin', salt);
      // Encrypt Password//

      const owner = await Owners.create({
        email: 'admin@metrics.ng',
        firstname: 'Agu',
        lastname: 'Chux',
        middlename: 'Stanley',
        mobile: '07068573376',
        password: hashedPassword,
        enabled: true,
      }).catch(catcher);

      if (owner) {
        res.status(200).json({
          status: true,
          token: owner._id,
        });
      } else {
        res
          .status(400)
          .json({ status: false, err: 'Failed to create Account' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
