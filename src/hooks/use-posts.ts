import useSWR from "swr";
import { request, gql } from "graphql-request";
import { CONTENT_API_URL, IS_PROD } from "../constants";

const fetchPosts = (query: string, preview: boolean) =>
  request(CONTENT_API_URL, query, { preview });

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
    [
      gql`
        query FetchPosts($preview: Boolean) {
          blogPostCollection(preview: $preview) {
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
