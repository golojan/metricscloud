import { Gender,ResponseFunctions } from '@metricsai/metrics-interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';

import { faker } from '@faker-js/faker';
import { getCookies, getCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const domain = getCookie('domain', { req, res });
      if (!domain) {
        res.status(400).json({ error: 'Invalid School ID' });
      }
      const { sex, type, challanged, departmentId } = req.query;

      const { Students } = await dbCon();
      const gender = sex == Gender.MALE ? 'male' : 'female';

      const created = await Students.create({
        domain: domain,
        avatar: faker.image.avatar(),
        departmentId: departmentId,
        regNumber: faker.random.numeric(10),
        firstname: faker.name.firstName(gender),
        lastname: faker.name.lastName(gender),
        mobile: faker.phone.number(),
        email: faker.internet.email(),
        gender: sex,
        studentType: type,
        challanged: challanged,
        enabled: true,
      }).catch(catcher);
      if (created?._id) {
        res.status(200).json({ status: true, accid: created?._id });
      } else {
        res
          .status(400)
          .json({ status: false, err: 'Failed to create account' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
