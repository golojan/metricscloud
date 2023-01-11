import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { Accounts } = await dbCon();
      const account = await Accounts.findOne({ _id: token }).catch(catcher);
      if (account) {
        res.status(200).json({
          status: true,
          data: {
            _id: account._id,
            accid: account._id,
            picture: account.picture,
            email: account.email,
            mobile: account.mobile,
            firstname: account.firstname,
            lastname: account.lastname,
            role: account.role,
            country: account.addresses.contact.country,
            enabled: account.enabled,
          },
        });
      }else{
        res.status(400).json({ status: false, error: 'Account not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else
    res.status(400).json({ status: 0, error: 'No Response for This Request' });
}