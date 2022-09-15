import fs from "fs";
import { fileURLToPath } from "url";
import { request, gql } from "graphql-request";

let pages = ["/", "/home", "/about", "/blog", "/projects"];

try {
  console.log("Going to fetch blog posts slug");

  const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
  const apiKey = process.env.VITE_CONTENTFUL_API_KEY;

  console.log("Going to check env variables");

  if (!spaceId) {
    throw new Error("`process.env.VITE_CONTENTFUL_SPACE_ID` is missing");
  }

  if (!apiKey) {
    throw new Error("`process.env.VITE_CONTENTFUL_API_KEY` is missing");
  }

  console.log("Successfully checked env variables");

  const query = gql`
    query FetchPosts {
      blogPostCollection {
        items {
          slug
        }
      }
    }
  `;

  console.log("Going to send API request");
  const apiURL = `https://graphql.contentful.com/content/v1/spaces/${spaceId}?access_token=${apiKey}`;
  const result = await request(apiURL, query);
  console.log("Successfully sent API request");
  pages = pages.concat(result.blogPostCollection.items.map((item => `/posts/${item.slug}`)));

  console.log("Successfully get blog posts slug");
} catch (error) {
  console.error("An error occured while trying to get posts:", error.message);
}

console.log("Going to generate sitemap.xml with", pages.length, "entries");

const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((path) => `<url>
    <loc>https://bacarybruno.com${path}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n\t")}
</urlset>`;

const __dirname = fileURLToPath(new URL(".", import.meta.url));
fs.writeFileSync(`${__dirname}../public/sitemap.xml`, sitemap);
console.log("Successfully generated sitemap.xml file");
