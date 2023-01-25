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
            verified: account.verified,
            schoolId: account.schoolId,
            departmentId: account.departmentId,
            username: account.username,
            firstname: account.firstname,
            lastname: account.lastname,
            aboutMe: account.aboutMe,
            email: account.email,
            accountType: account.accountType,
            gender: account.gender,
            birthday: account.birthday,
            picture: account.picture,
            schoolCode: account.schoolCode,
            scopusId: account.scopusId,
            orcidId: account.orcidId,
            googleScholarId: account.googleScholarId,
            googlePresence: account.googlePresence,
            citations: account.citations,
            hindex: account.hindex,
            i10hindex: account.i10hindex,
            totalPublications: account.totalPublications,
            firstPublicationYear: account.firstPublicationYear,
            lastPublicationYear: account.lastPublicationYear,
            smsNotification: account.smsNotification,
            emailNotification: account.emailNotification,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
          },
        });
      } else {
        res.status(400).json({ status: false, error: 'Account not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else
    res.status(400).json({ status: 0, error: 'No Response for This Request' });
}
