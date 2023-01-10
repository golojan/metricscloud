import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
const slugify = require('slugify');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { lastname, firstname, middlename, email, mobile, regfee } =
        req.body;
      const { Schools } = await dbCon();

      const created = await Schools.create({
        lastname: lastname,
        firstname: firstname,
        middlename: middlename,
        email: email,
        mobile: mobile,
      }).catch(catcher);
      console.log(created);

      if (!created) {
        res.status(404).json({ status: 0, err: 'Error creating account' });
      } else {
        res.status(200).json({ status: 1, pageid: created._id });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else
    res.status(400).json({ status: 0, error: 'No Response for This Request' });
}
