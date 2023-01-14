import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { sendMail } from '@metricsai/metrics-mail';

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

      await Accounts.findOne({
        email: username,
      })
        .then((account) => {
          if (account) {
            const isPasswordValid = bcrypt.compareSync(
              password,
              account.password
            );
            if (isPasswordValid) {
              const mailOptions = {
                from: 'noReply@metrics.ng',
                fromName: 'Metrics AI',
                to: account.email,
                toName: `${account.firstname} ${account.lastname}`,
                subject: 'Login Notification',
                text: `You have logged in to your account at ${new Date()}`,
                html: `<p>You have logged in to your account at ${new Date()}</p>`,
              };
              const sent = sendMail('welcome', mailOptions);
              console.log(sent);
              res.status(200).json({
                status: true,
                token: account._id,
              });
            } else {
              res
                .status(400)
                .json({ status: false, error: 'Invalid Login detailes' });
              return;
            }
          } else {
            res
              .status(400)
              .json({ status: false, error: 'Invalid Login detailes' });
            return;
          }
        })
        .catch(catcher);
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
