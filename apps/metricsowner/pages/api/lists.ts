import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon } from '@metricsai/metrics-models';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Schools, Indicators, Accounts, Roles, Memberships } =
        await dbCon();

      const schools = await Schools.find({}).catch(catcher);
      const indicators = await Indicators.find({}).catch(catcher);
      const accounts = await Accounts.find({}).catch(catcher);
      const roles = await Roles.find({}).catch(catcher);
      const memberships = await Memberships.find({}).catch(catcher);

      res.status(200).json({
        status: true,
        schools: schools,
        indicators: indicators,
        accounts: { accounts },
        roles: roles,
        memberships: memberships,
      });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
