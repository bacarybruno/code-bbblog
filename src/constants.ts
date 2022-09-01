export const CONTENT_API_URL = `https://graphql.contentful.com/content/v1/spaces/${
  import.meta.env.VITE_CONTENTFUL_SPACE_ID
}?access_token=${import.meta.env.VITE_CONTENTFUL_API_KEY}`;

export const IS_PROD = import.meta.env.PROD;
