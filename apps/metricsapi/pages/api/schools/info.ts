import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon, allowCors } from './../../../models';
import { getDomain } from '@metricsai/metrics-utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      // implement origin

      // Try capture domain //
      const { host } = req.headers;
      const domain = getDomain(host as string);
      console.log('Domain: ', domain);
      // Try capture domain //
      const { Schools } = await dbCon();
      // Get the School info with domain //
      const school = await Schools.findOne({ domain: domain }).catch(catcher);
      if (school) {
        res.status(200).json({
          status: true,
          domain: domain,
          schoolId: school._id,
          data: school,
        });
      } else {
        res.status(400).json({ status: false });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};
