import type { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

export default async (_request: VercelRequest, response: VercelResponse) => {
  const file = join(__dirname, '../dist', 'index.html');
  const stringified = readFileSync(file, 'utf8');
  return response.setHeader('Content-Type', 'text/html').send(stringified);
};
