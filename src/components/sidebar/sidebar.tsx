import { useState } from 'react';
import { useTabsStore, useLayoutStore } from '../../store';
import { usePosts } from '../../hooks';
import * as SC from './styles';
import { isMobile } from '../../utils';

export const Sidebar = () => {
  const { data: posts } = usePosts();
  const currentTab = useTabsStore((state) => state.currentTab);
  const showSidebar = useLayoutStore((state) => state.showSidebar);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  const [showArticles, setShowArticles] = useState(true);

  if (!showSidebar) {
    return null;
  }

  return (
    <SC.Sidebar>
      <SC.SidebarTitle>
        <h2>Website content</h2>
      </SC.SidebarTitle>
      <>
        <SC.SidebarPanel onClick={() => setShowArticles(!showArticles)}>
          <SC.PanelIcon
            name={showArticles ? 'chevron-down' : 'chevron-right'}
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
                href={`/posts/${post.slug}`}
                onClick={isMobile() ? toggleSidebar : undefined}
                data-active={
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
