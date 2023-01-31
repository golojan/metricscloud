import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from './../../../../models';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import nextCookie from 'next-cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only POST Method is allowed' });
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const { lecturers, students, school, name, allschools } = req.body;

      const { Schools } = await dbCon();
      const saved = await Schools.findOneAndUpdate(
        { _id: schoolId },
        {
          $push: {
            history: {
              name: name,
              lecturers: lecturers,
              students: students,
              googlePresence: school.googlePresence,
              citations: school.citations,
              hindex: school.hindex,
              i10hindex: school.i10hindex,
              allschools: allschools,
            },
          },
        }
      ).catch(catcher);

      console.log({ saved });

      if (saved) {
        res.status(200).json({
          status: true,
          data: saved,
        });
      } else {
        res.status(404).json({ status: false, err: 'Account not found' });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
