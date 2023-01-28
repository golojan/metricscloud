import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseFunctions } from '@metricsai/metrics-interfaces';
import { GSRanking } from '@metricsai/metrics-interfaces';

import type { GoogleScholarAuthorParameters } from 'serpapi';
import { getJson } from 'serpapi';

import serpiData from '../../../../../../../serpi.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ status: 0, error: error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ status: false, err: 'Only GET Method is allowed' });
    },
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      ////
      const stringId = req.query.stringId as string;
      // ////

      const params: GoogleScholarAuthorParameters = {
        api_key: '0536b2c2259d73458b8ae5452f59907b2764f393c7c2d861ae15e29abbf60b3f',
        hl: 'en',
        start: 0,
        author_id: stringId,
        num: '1000',
      };

      // // Show result as JSON
      const response = await getJson('google_scholar_author', params);
      const { search_metadata, author } = response;
      if (search_metadata.status !== 'Success') {
        res.status(200).json({
          status: false,
          err: 'Invalid Google Scholar ID',
        });
      } else {
        const { articles, cited_by } = response;
        const { table, graph } = cited_by;

        let maxYear = Math.max(
          ...articles
            .filter((article) => article.year && article.year !== 'null')
            .map((article) => parseInt(article.year)),
        );

        let minYear = Math.min(
          ...articles
            .filter((article) => article.year && article.year !== 'null')
            .map((article) => parseInt(article.year)),
        );

        const totalPub = articles.length;

        const { citations } = table[0];
        const { h_index } = table[1];
        const { i10_index } = table[2];

        res.status(200).json({
          status: true,
          ranking: {
            googlePresence: 1,
            totalPublications: totalPub,
            firstPublicationYear: minYear,
            lastPublicationYear: maxYear,
            citations: citations.all,
            hindex: h_index.all,
            i10hindex: i10_index.all,
            authorMetadata: author,
            publications: articles,
            searchMetadata: response,
          } as GSRanking,
        });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
}
