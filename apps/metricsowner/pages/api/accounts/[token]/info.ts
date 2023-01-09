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
      const { Accounts, Schools } = await dbCon();
      const account = await Accounts.findOne({ _id: token }).catch(catcher);
      if (account) {
        const school = await Schools.findOne({ _id: account.schoolId }).catch(
          catcher
        );
        res.status(200).json({
          status: true,
          schoolId: account.schoolId,
          school: school,
          passwordKey: account.passwordKey,
          email: account.email,
          mobile: account.mobile,
          firstname: account.firstname,
          lastname: account.lastname,
          middlename: account.middlename,
          role: account.role,
          accountType: account.accountType,
          enabled: account.enabled,
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
