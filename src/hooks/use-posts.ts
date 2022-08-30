import useSWR from "swr";
import { request, gql } from "graphql-request";

const API_URL = "https://graphql.contentful.com/content/v1/spaces";

const fetchPosts = (query: string) =>
  request(
    `${API_URL}/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}?access_token=${import.meta.env.VITE_CONTENTFUL_API_KEY}`,
    query
  );

type FetchPostsQueryResult = {
  blogPostCollection: {
    items: {
      icon: string;
      slug: string;
      title: string;
      sys: {
        id: string;
      };
    }[];
  };
};

export const usePosts = () => {
  const { data, error } = useSWR<FetchPostsQueryResult>(
    gql`
      query FetchPosts {
        blogPostCollection {
          items {
            title
            icon
            slug
            sys {
              id
            }
          }
        }
      }
    `,
    fetchPosts
  );

  return {
    data: data?.blogPostCollection.items,
    error,
    isLoading: !error && !data,
    enabled: true,
  };
};

const fetchSinglePost = (query: string, slug: string) =>
  request(
    `${API_URL}/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}?access_token=${import.meta.env.VITE_CONTENTFUL_API_KEY}`,
    query,
    { slug }
  );

type FindPostBySlugQueryResult = {
  blogPostCollection: {
    items: {
      icon: string;
      slug: string;
      title: string;
      body: string;
    }[];
  };
};

export const usePost = (slug: string | null) => {
  const { data, error } = useSWR<FindPostBySlugQueryResult>(
    slug
      ? [
          gql`
            query FindPostBySlug($slug: String!) {
              blogPostCollection(where: { slug: $slug }) {
                items {
                  title
                  icon
                  slug
                  body
                }
              }
            }
          `,
          slug,
        ]
      : null,
    fetchSinglePost
  );

  return {
    data: data?.blogPostCollection.items[0],
    isLoading: !error && !data,
    enabled: slug !== null,
  };
};
