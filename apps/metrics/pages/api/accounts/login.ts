import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

const nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '84912638d615c7fab87f10066ddfc934', // generated ethereal user
    pass: 'abf622807081550b330301532e319126', // generated ethereal password
  },
});

const bcrypt = require('bcryptjs');

// const mailOptions = {
//   from: 'noReply@metrics.ng',
//   fromName: 'Metrics AI',
//   to: account.email,
//   toName: `${account.firstname} ${account.lastname}`,
//   subject: 'Login Notification',
//   text: `You have logged in to your account at ${new Date()}`,
//   html: `<p>You have logged in to your account at ${new Date()}</p>`,
// };

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
              transporter.sendMail(
                {
                  from: 'noReply@metrics.ng',
                  fromName: 'Metrics AI',
                  to: account.email,
                  toName: `${account.firstname} ${account.lastname}`,
                  subject: 'Login Notification',
                  text: `You have logged in to your account at ${new Date()}`,
                  html: `<p>You have logged in to your account at ${new Date()}</p>`,
                },
                (error: Error, info: any) => {
                  if (error) {
                    return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);
                  // Preview only available when sending through an Ethereal account
                  console.log(
                    'Preview URL: %s',
                    nodemailer.getTestMessageUrl(info)
                  );
                }
              );

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
