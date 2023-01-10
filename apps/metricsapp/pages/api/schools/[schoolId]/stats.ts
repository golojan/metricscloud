import {
  Gender,
  LecturerLevel,
  LecturerType,
  ResponseFunctions,
} from '@metricsai/metrics-interfaces';
import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(200)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { schoolId } = req.query;
      const { Lecturers } = await dbCon();

      const results = await Lecturers.aggregate([
        { $match: { schoolId: schoolId } },
        {
          $addFields: {
            TgooglePresence: {
              $sum: '$googlePresence',
            },
            Tcitations: {
              $sum: '$citations',
            },
            Thindex: {
              $sum: '$hindex',
            },
            Ti10hindex: {
              $sum: '$i10hindex',
            },
          },
        },
      ]);

      // console.log(results);

      res.status(200).json({
        // status: true,
        // count: count,
        // countLocal: countLocal,
        // countIntl: countIntl,
      });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
