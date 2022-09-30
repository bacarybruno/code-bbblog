import { request, gql } from 'graphql-request';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const staticPages = ['', '/about', '/blog'];

type BlogPostCollection = {
  blogPostCollection: { items: { slug: string }[] };
};

const getDynamicPages = async () => {
  try {
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

    const query = gql`
      query FetchPosts {
        blogPostCollection {
          items {
            slug
          }
        }
      }
    `;

    console.log('Going to send API request');
    const apiURL = `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${apiKey}`;
    const result = await request<BlogPostCollection>(apiURL, query);
    console.log('Successfully sent API request');
    return result.blogPostCollection.items.map((item) => `/posts/${item.slug}`);
  } catch (error) {
    console.error('An error occured while trying to get posts:', (error as Error).message);
  }
};

export default async (_request: VercelRequest, response: VercelResponse) => {
  const dynamicPages = await getDynamicPages();
  let pages = staticPages;
  if (dynamicPages) {
    console.log('Got', dynamicPages.length, 'blog posts');
    pages = pages.concat(dynamicPages);
  }

  console.log('Got', pages, 'pages in total');
  const sitemap = `
    <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      ${pages.map((path) => `
        <url>
          <loc>https://bacarybruno.com${path}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  return response
    .status(200)
    .setHeader('Content-Type', 'application/xml')
    .send(sitemap);
};
