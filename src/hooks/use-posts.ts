import useSWR from "swr";
import { request, gql } from "graphql-request";
import { CONTENT_API_URL, IS_PROD } from "../constants";

export type BlogPostItem = {
  title: string;
  icon: string;
  slug: string;
  excerpt: string;
  body: string;
  sys: {
    id: string;
    publishedAt: string;
  };
};

type FetchPostsQueryResult = {
  blogPostCollection: {
    items: BlogPostItem[];
  };
};

const fetchPosts = (query: string, preview: boolean) =>
  request(CONTENT_API_URL, query, { preview });


export const usePosts = () => {
  const { data, error } = useSWR<FetchPostsQueryResult>(
    [
      gql`
        query FetchPosts($preview: Boolean) {
          blogPostCollection(preview: $preview) {
            items {
              title
              icon
              slug
              excerpt
              body
              sys {
                id
                publishedAt
              }
            }
          }
        }
      `,
      !IS_PROD,
    ],
    fetchPosts
  );

  return {
    data: data?.blogPostCollection.items,
    error,
    isLoading: !error && !data,
    enabled: true,
  };
};
