import { request, gql } from 'graphql-request';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getContentfulApiURL } from './helpers';

const staticPages = ['', '/about', '/blog'];

type BlogPostCollection = {
  blogPostCollection: { items: { slug: string }[] };
};

const getDynamicPages = async () => {
  try {
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
    const apiURL = getContentfulApiURL();
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

  console.log('Got', pages.length, 'pages in total');
  const sitemap = `
    <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      ${pages.map((path) => `
        <url>
          <loc>https://bacarybruno.com${path}</loc>
          <changefreq>daily</changefreq>
        </url>
      `).join('')}
    </urlset>
  `;

  return response
    .setHeader('Content-Type', 'application/xml')
    .send(sitemap);
};
