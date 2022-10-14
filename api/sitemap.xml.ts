import { request, gql } from 'graphql-request';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBaseUrl, getContentfulApiURL } from './helpers';

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

    const apiURL = getContentfulApiURL();
    const result = await request<BlogPostCollection>(apiURL, query);
    return result.blogPostCollection.items.map((item) => `/posts/${item.slug}`);
  } catch (error) {
    return [];
  }
};

export default async (_request: VercelRequest, response: VercelResponse) => {
  const dynamicPages = await getDynamicPages();
  const allPages = [...dynamicPages, ...staticPages];

  const sitemap = `
    <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      ${allPages.map((slug) => `
        <url>
          <loc>${getBaseUrl()}${slug}</loc>
          <changefreq>daily</changefreq>
        </url>
      `).join('')}
    </urlset>
  `;

  return response
    .setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    )
    .setHeader('Content-Type', 'application/xml')
    .send(sitemap);
};
