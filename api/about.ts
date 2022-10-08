import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBaseUrl, getParsedHTML } from './helpers';

type Meta = {
  title: string;
  description: string;
  url: string;
  image: string | null;
};

const meta: Meta = {
  title: 'Code-BBBlog | About',
  description: '👨🏽‍💻 Hello! I\'m Bruno. A FullStack Developer and Lifelong learner who loves building great products that has a positive impact 🤩 Passionate about Software Engineering 💻, japanese anime\'s 🥷 and building side projects.',
  url: '',
  image: 'https://placehold.co/600x400/EEE/31343C/png?text=Hello! I\'m Bruno&font=Roboto',
};

// TODO: add cache control
export default async (request: VercelRequest, response: VercelResponse) => {
  meta.url = getBaseUrl(request.url);
  const stringified = getParsedHTML(meta);
  return response
    .setHeader('Cache-Control', 's-maxage=86400')
    .setHeader('Content-Type', 'text/html').send(stringified);
};
