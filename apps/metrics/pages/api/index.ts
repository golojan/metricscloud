// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseFunctions } from '@metrics/metrics-interfaces';
import { dbCon } from '@metrics/metrics-models';

type Data = {
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(400).json({ error: 'Invalid API Route' })
}
