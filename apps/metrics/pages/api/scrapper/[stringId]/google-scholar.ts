import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';

import cheerio from 'cheerio';

import { GSRanking } from '@metricsai/metrics-interfaces';

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
      const stringId = req.query.stringId;
      //   console.log(url);
      try {
        const googleScholarUrl = `https://scholar.google.com/citations?user=${stringId}&hl=en`;
        const response = await fetch(googleScholarUrl);
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);

        const keys = [];
        const result: any = [];

        $(`td.gsc_rsb_std`).each((idx: number, ref: any) => {
          const value = $(ref).text().trim();
          keys.push(idx);
          result[idx] = value;
        });

        const akeys = [];
        const aresult: any = [];
        $(`div.gsc_rsb_m_a span`).each((adx: number, ref: any) => {
          const value = $(ref).text().trim();
          akeys.push(adx);
          aresult[adx] = value;
        });
        
        // get the number from the string
        const totalPub:number = parseInt(aresult[0].replace(/[^0-9]/g, ''));        
        res.status(200).json({
          status: true,
          ranking: {
            totalPublications:totalPub,
            citations: result[0],
            hindex: result[2],
            i10hindex: result[4],
          } as GSRanking,
        });
      } catch (e) {
        res.status(404).json({
          status: false,
          error: `no data found. Tip: Double check the url.`
        });
      }
    },
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}