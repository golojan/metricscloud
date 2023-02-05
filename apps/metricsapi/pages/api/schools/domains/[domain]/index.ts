// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { dbCon, allowCors } from '../../../../../models';

type Data = {
  error?: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(400).json({ error: 'Invalid API Route' });
};

export default allowCors(handler); 