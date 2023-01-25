import {
  Gender,
  LecturerLevel,
  LecturerType, ResponseFunctions
} from '@metricsai/metrics-interfaces';

import { NextApiRequest, NextApiResponse } from 'next';
import { dbCon } from '@metricsai/metrics-models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) =>
    res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { username } = req.query;
      const { Lecturers } = await dbCon();
      const lecturer = await Lecturers.findOne({ username: username });
      if (lecturer) {
        res.status(200).json({
          status: true,
          data: lecturer,
        });
      } else {
        res.status(400).json({ status: false, error: 'No LEcturer Found' });
      }
    },
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res
        .status(404)
        .json({ status: false, err: 'Only GET Method is allowed' });
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
