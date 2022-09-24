import useSWR from "swr";
import { request, gql } from "graphql-request";
import { CONTENT_API_URL, IS_PROD } from "../constants";

type FindPostBySlugQueryResult = {
  blogPostCollection: {
    items: {
      title: string;
      icon: string;
      slug: string;
      body: string;
      sys: {
        publishedAt: string;
      };
    }[];
  };
};

const fetchSinglePost = (query: string, slug: string, preview: boolean) =>
  request(CONTENT_API_URL, query, { slug, preview });

export const usePost = (slug: string | null) => {
  const { data, error } = useSWR<FindPostBySlugQueryResult>(
    slug
      ? [
          gql`
            query FindPostBySlug($slug: String!, $preview: Boolean) {
              blogPostCollection(where: { slug: $slug }, preview: $preview) {
                items {
                  title
                  icon
                  slug
                  body
                  sys {
                    publishedAt
                  }
                }
              }
            }
          `,
          slug,
          !IS_PROD,
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
