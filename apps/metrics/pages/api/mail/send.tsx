import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
  apiKey: '84912638d615c7fab87f10066ddfc934',
  apiSecret: 'abf622807081550b330301532e319126',
  config: {
    host: 'api.mailjet.com',
    version: 'v3',
    output: 'json',
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { toEmail, toName, sebject, htmlBody } = req.body;
      //Send mail now
      mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: 'noReply@metrics.ng',
                Name: 'Metrics AI',
              },
              To: [
                {
                  Email: `${toEmail}`,
                  Name: `${toName}`,
                },
              ],
              Subject: `${sebject}`,
              TextPart: `${htmlBody}`,
            },
          ],
        })
        .then((result) => {
          res.status(200).json({
            status: true,
            message: {
              status: result.body,
            },
          });
          return;
        })
        .catch((err) => {
          res.status(400).json({ status: false, err: err.statusCode });
          return;
        });
      return;
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
