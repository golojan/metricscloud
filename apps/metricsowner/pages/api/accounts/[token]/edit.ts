import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
const bcrypt = require('bcryptjs');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const {
        schoolid,
        firstname,
        lastname,
        middlename,
        email,
        mobile,
        membership,
        role,
        passwordKey,
      } = req.body;

      const { Accounts } = await dbCon();

      // Encrypt Password//
      const salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(passwordKey, salt);
      // Encrypt Password//

      const saved = await Accounts.updateOne(
        { _id: token },
        {
          schoolid: schoolid,
          firstname: firstname,
          lastname: lastname,
          middlename: middlename,
          email: email,
          mobile: mobile,
          accountType: membership,
          role: role,
          passwordKey: passwordKey,
          password: hashedPassword,
        }
      ).catch(catcher);
      if (saved) {
        res.status(200).json({
          status: true,
          data: saved,
        });
      } else {
        res.status(400).json({ status: false, error: 'Account not found' });
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
