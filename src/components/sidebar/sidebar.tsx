import { useLocation } from "wouter";
import { useState } from "react";
import { useTabsStore } from "../../store";
import { usePosts } from "../../hooks";
import {
  ListItem,
  PanelIcon,
  PostsContainer,
  SidebarPanel,
  SidebarTitle,
  StyledH3,
  StyledIcon,
  StyledSidebar,
} from "./styles";

export const Sidebar = () => {
  const [_, setLocation] = useLocation();
  const { currentTab } = useTabsStore();
  const [showArticles, setShowArticles] = useState(true);
  const { data: posts } = usePosts();

  return (
    <StyledSidebar>
      <SidebarTitle>
        <h2>Website content</h2>
      </SidebarTitle>
      <>
        <SidebarPanel onClick={() => setShowArticles(!showArticles)}>
          <PanelIcon
            name={showArticles ? "chevron-down" : "chevron-right"}
            title=""
          />
          <StyledH3>Articles</StyledH3>
        </SidebarPanel>
        {showArticles && posts && (
          <PostsContainer>
            {posts.map((post) => (
              <ListItem
                key={post.slug}
                title={post.title}
                onClick={() => setLocation(`/posts/${post.slug}`)}
                active={
                  currentTab?.slug.toLowerCase() === post.slug.toLowerCase()
                }
              >
                <StyledIcon name={post.icon} title={post.title} />
                <span>{post.title}</span>
              </ListItem>
            ))}
          </PostsContainer>
        )}
      </>
    </StyledSidebar>
  );
};
