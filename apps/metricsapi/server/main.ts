import express, { Request, Response } from 'express';
import { parse } from 'url';
import * as path from 'path';
import next from 'next';
import cors from 'cors';
const helmet = require('helmet');

// Next.js server options:
// - The environment variable is set by `@nrwl/next:server` when running the dev server.
// - The fallback `__dirname` is for production builds.
// - Feel free to change this to suit your needs.
const dir = process.env.NX_NEXT_DIR || path.join(__dirname, '..');
const dev = process.env.NODE_ENV === 'development';

// HTTP Server options:
// - Feel free to change this to suit your needs.
const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT ? parseInt(process.env.PORT) : 4200;

async function main() {
  const nextApp = next({ dev, dir });
  const handle = nextApp.getRequestHandler();
  await nextApp.prepare();

  const server = express();

  server.all('/api/hello', (req: Request, res: Response) => {
    const parsedUrl = parse(req.url, true);
    res.status(200).json({ status: false, erro: 'Invalid or Un-Authorized API Request' });
    // return handle(req, res, parsedUrl);
  });

  server.listen(port, hostname, () => {
    console.log(`>> Ready on http://${hostname}:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


//npx nx build metricsapi --prod
//dist/apps/metricsapi/.next
//npx nx-ignore metricsapi