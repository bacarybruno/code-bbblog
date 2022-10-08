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
  const post = await findPostBySlug(request.query.title as string);

  const meta: Meta = {
    title: `CodeBBBlog | ${post.blogPostCollection.items[0]?.title}`,
    description: post.blogPostCollection.items[0]?.excerpt,
    url: getBaseUrl(request.url),
    image: null,
  };
  const stringified = getParsedHTML(meta);

  return response.setHeader('Content-Type', 'text/html').send(stringified);
};
