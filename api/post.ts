import type { VercelRequest, VercelResponse } from '@vercel/node';
import { request, gql } from 'graphql-request';
import { getBaseUrl, getContentfulApiURL, getParsedHTML } from './helpers';

type Meta = {
  title: string;
  description: string;
  url: string;
  image: string | null;
};

type BlogPost = {
  blogPostCollection: {
    items: {
      title: string;
      excerpt: string;
    }[];
  };
};

const findPostBySlug = async (slug: string) => {
  const apiURL = getContentfulApiURL();
  const query = gql`
    query FindPostBySlug($slug: String!) {
      blogPostCollection(where: { slug: $slug }) {
        items {
          title
          excerpt
        }
      }
    }
  `;
  const result = await request<BlogPost>(apiURL, query, { slug });
  return result;
};

// TODO: add cache control
export default async (request: VercelRequest, response: VercelResponse) => {
  const data = await findPostBySlug(request.query.title as string);
  const post = data.blogPostCollection.items[0];

  const meta: Meta = {
    title: post?.title,
    description: post?.excerpt,
    url: getBaseUrl(request.url),
    image: `https://placehold.co/900x450/007ACC/FFFFFF?text=${post?.title}&font=Roboto`,
  };
  const stringified = getParsedHTML(meta);

  return response.setHeader('Content-Type', 'text/html').send(stringified);
};
