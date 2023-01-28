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
        console.log(stringId);
      // extract from Scopus scholar
      try {
        const googleScholarUrl = `https://www.scopus.com/authid/detail.uri?authorId=${stringId}`;
        const response = await fetch(googleScholarUrl);
        const htmlString = await response.text();
        // const $ = cheerio.load(htmlString);

        // const keys = [];
        // const result: any = [];

        console.log(htmlString);
        // get the number from the string
        
        res.status(200).json({
          status: true,
          ranking: {html:htmlString}
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
