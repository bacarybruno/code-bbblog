import { useLocation } from "wouter";
import { useState } from "react";
import { useTabsStore } from "../../store";
import { usePosts } from "../../hooks";
import * as SC from "./styles";

export const Sidebar = () => {
  const [_, setLocation] = useLocation();
  const { currentTab } = useTabsStore();
  const [showArticles, setShowArticles] = useState(true);
  const { data: posts } = usePosts();

  return (
    <SC.Sidebar>
      <SC.SidebarTitle>
        <h2>Website content</h2>
      </SC.SidebarTitle>
      <>
        <SC.SidebarPanel onClick={() => setShowArticles(!showArticles)}>
          <SC.PanelIcon
            name={showArticles ? "chevron-down" : "chevron-right"}
            title=""
          />
          <SC.H3>Articles</SC.H3>
        </SC.SidebarPanel>
        {showArticles && posts && (
          <SC.PostsContainer>
            {posts.map((post) => (
              <SC.ListItem
                key={post.slug}
                title={post.title}
                onClick={() => setLocation(`/posts/${post.slug}`)}
                active={
                  currentTab?.slug.toLowerCase() === post.slug.toLowerCase()
                }
              >
                <SC.Icon name={post.icon} title={post.title} />
                <span>{post.title}</span>
              </SC.ListItem>
            ))}
          </SC.PostsContainer>
        )}
      </>
    </SC.Sidebar>
  );
};
