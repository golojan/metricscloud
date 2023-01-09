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

      // Count Schools
      const scCount = await Schools.countDocuments().catch(catcher);
      // Count Indicators
      const indCount = await Indicators.countDocuments().catch(catcher);
      // Count Accounts
      const accntCount = await Accounts.countDocuments().catch(catcher);
      // Count Roles
      const rolesCount = await Roles.countDocuments().catch(catcher);
      // Count Memberships
      const membershipCount = await Memberships.countDocuments().catch(catcher);

      res.status(200).json({
        status: true,
        schoolsCount: scCount,
        indicatorsCount: indCount,
        accountsCount: accntCount,
        rolesCount: rolesCount,
        membershipCount: membershipCount,
      });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
