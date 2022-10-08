import { readFileSync } from 'fs';
import { join } from 'path';

type Meta = {
  title: string;
  description: string;
  url: string;
  image: string | null;
};

export const getBaseUrl = (requestUrl = '') => {
  let baseUrl =
    process.env.BASE_URL ||
    process.env.VERCEL_URL ||
    process.env.VITE_VERCEL_URL ||
    'https://bacarybruno.com';
  baseUrl = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
  return baseUrl + requestUrl.split('?')[0];
};

export const getParsedHTML = (meta: Meta) => {
  const file = join(__dirname, '../../dist', 'index.html');
  return readFileSync(file, 'utf8')
    .replace(/{{title}}/g, meta.title)
    .replace(/{{description}}/g, meta.description)
    .replace(/{{url}}/g, meta.url)
    .replace(/{{image}}/g, meta.image || '');
};

export const getContentfulApiURL = () => {
  console.log('Going to fetch blog posts slug');

  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
  const apiKey = process.env.VITE_CONTENTFUL_API_KEY;

  console.log('Going to check env variables');

  if (!spaceId) {
    throw new Error('`process.env.VITE_CONTENTFUL_SPACE_ID` is missing');
  }

  if (!apiKey) {
    throw new Error('`process.env.VITE_CONTENTFUL_API_KEY` is missing');
  }

  console.log('Successfully checked env variables');

  console.log('Going to send API request');
  return `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${apiKey}`;
};
