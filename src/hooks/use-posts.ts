import useSWR from "swr";
import { request, gql } from "graphql-request";

const fetchPosts = (query: string) =>
  request(
    "https://graphql.contentful.com/content/v1/spaces/iy4ls6e3n24i?access_token=s1YmC0hzFwlc2Hqo8VrY0Ve01MC7HPpz6OpewSweHD8",
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
    "https://graphql.contentful.com/content/v1/spaces/iy4ls6e3n24i?access_token=s1YmC0hzFwlc2Hqo8VrY0Ve01MC7HPpz6OpewSweHD8",
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
