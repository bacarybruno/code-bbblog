import { request, gql } from 'graphql-request';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBaseUrl, getContentfulApiURL } from './helpers';
// eslint-disable-next-line
const RSS = require('rss');

type BlogPostCollection = {
  blogPostCollection: {
    items: {
      title: string;
      slug: string;
      excerpt: string;
      sys: {
        publishedAt: string;
      };
    }[];
  };
};

const getDynamicPages = async () => {
  try {
    const query = gql`
      query FetchPosts {
        blogPostCollection {
          items {
            title
            slug
            excerpt
            sys {
              publishedAt
            }
          }
        }
      }
    `;

    const apiURL = getContentfulApiURL();
    const result = await request<BlogPostCollection>(apiURL, query);
    return result.blogPostCollection.items;
  } catch (error) {
    return [];
  }
};

export default async (_request: VercelRequest, response: VercelResponse) => {
  const allBlogPosts = await getDynamicPages();
  const feed = new RSS({
    title: 'Code-BBBlog by @bacarybruno',
    site_url: getBaseUrl(),
    feed_url: `${getBaseUrl()}/feed.xml`,
  });

  allBlogPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `${getBaseUrl()}/posts/${post.slug}`,
      date: post.sys.publishedAt,
      description: post.excerpt
    });
  });

  return response
    .setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    .setHeader('Content-Type', 'application/xml')
    .send(feed.xml({ indent: true }));
};
