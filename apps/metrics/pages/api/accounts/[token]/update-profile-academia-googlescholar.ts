import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { dbCon } from '@metricsai/metrics-models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { googleScholarId, scrap } = req.body;
      const {
        totalPublications,
        citations,
        hindex,
        i10hindex,
        firstPublicationYear,
        lastPublicationYear,
      } = scrap;

      const { Accounts } = await dbCon();

      const saved = await Accounts.updateOne(
        { _id: token },
        {
          googleScholarId: googleScholarId,
          totalPublications: totalPublications,
          citations: citations,
          hindex: hindex,
          i10hindex: i10hindex,
          googlePresence: 1,
          firstPublicationYear: firstPublicationYear,
          lastPublicationYear: lastPublicationYear,
        }
      ).catch(catcher);
      if (saved) {
        res.status(200).json({
          status: true,
          data: saved,
        });
        return;
      } else {
        res.status(400).json({ status: false, error: 'Account not found' });
        return;
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
