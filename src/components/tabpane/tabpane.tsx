import readingTime from 'reading-time';
import { Suspense, useEffect, useState, lazy } from 'react';
import type { SyntheticEvent } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Flexbox, SvgIcon, Seo, Comments } from '../index';
import { PageTab, useTabsStore } from '../../store';
import { defaultPage, findPage } from '../../pages';
import { usePost } from '../../hooks';
import * as SC from './styles';

const Markdown = lazy(() => import('../markdown/markdown'));

type TabpanelIconProps = {
  active?: boolean;
  name: string;
  title: string;
  onClick: (event: SyntheticEvent) => void;
};

const TabpanelIcon = ({ active, name, title, onClick }: TabpanelIconProps) => {
  return (
    <SC.TabpanelIcon
      name={name}
      title={title}
      active={active}
      onClick={onClick}
    />
  );
};

type TabpanelHeaderProps = {
  title: string;
  active?: boolean;
  icon: string;
  onClose: () => void;
  onClick: (event: SyntheticEvent) => void;
  type: 'seticon' | 'codicon';
};

const TabpanelHeader = ({
  title,
  active,
  icon,
  onClick,
  onClose,
  type,
}: TabpanelHeaderProps) => {
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const onCloseTab = (event: SyntheticEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <SC.TabpanelHeader
      active={active}
      onMouseOver={() => setShowCloseIcon(true)}
      onMouseLeave={() => setShowCloseIcon(false)}
      title={title}
      onClick={onClick}
      className="tabpane__header"
    >
      {type === 'codicon' && <SC.Codicon name={icon} title={title} />}
      {type === 'seticon' && <SvgIcon name={icon} title={title} />}
      <SC.TabpanelTitle>{title}</SC.TabpanelTitle>
      <SC.TabpanelAction>
        {showCloseIcon && (
          <TabpanelIcon
            name="close"
            active={active}
            title="Close"
            onClick={onCloseTab}
          />
        )}
      </SC.TabpanelAction>
    </SC.TabpanelHeader>
  );
};

const EditButton = () => {
  return (
    <SC.TabpanelAction>
      <TabpanelIcon
        name="edit"
        active
        title="Suggest a modification"
        onClick={() => null}
      />
    </SC.TabpanelAction>
  );
};

const useTabpaneActions = () => {
  const [location, setLocation] = useLocation();
  const [matchPosts, params] = useRoute('/posts/:slug');

  const {
    data: post,
    enabled,
    isLoading,
  } = usePost(matchPosts ? params.slug : null);
  const page = enabled ? post : findPage(location);

  const openedTabs = useTabsStore((state) => state.openedTabs);
  const currentTab = useTabsStore((state) => state.currentTab);
  const closeTab = useTabsStore((state) => state.closeTab);
  const focusTab = useTabsStore((state) => state.focusTab);
  const openTab = useTabsStore((state) => state.openTab);

  const onCloseTab = (tabSlug: string) => {
    closeTab(tabSlug);

    if (openedTabs.size === 1 && openedTabs.has(tabSlug)) {
      openTab(defaultPage);
      setLocation(defaultPage.slug);
      return;
    }

    const isCurrentlyOpenedTab =
      currentTab?.slug.toLowerCase() === tabSlug.toLowerCase();

    if (isCurrentlyOpenedTab) {
      const otherTabs = Array.from(openedTabs.keys()).filter(
        (openedTab) => openedTab.toLowerCase() !== tabSlug.toLowerCase()
      );
      const nextTabSlub = otherTabs[otherTabs.length - 1] || null;
      if (!nextTabSlub) return;

      const nextTab = openedTabs.get(nextTabSlub);
      if (!nextTab) return;

      focusTab(nextTab);
      setLocation(
        nextTab.type === 'post' ? `/posts/${nextTab.slug}` : nextTab.slug
      );
    }
  };

  useEffect(() => {
    if (enabled && isLoading) {
      return;
    }

    if (!page) {
      return setLocation('/');
    }

    const newTab: PageTab = {
      ...page,
      type: matchPosts ? 'post' : 'page',
    };

    openTab(newTab);
    focusTab(newTab);
  }, [enabled, isLoading, page, matchPosts, openTab, focusTab, setLocation]);

  return {
    onOpenTab: setLocation,
    onCloseTab,
  };
};

const BlogPostFooter = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <hr />
      <SC.Paragraph>
        <em>Love what you are reading ? Give a ?????? to show your support ??????</em>
      </SC.Paragraph>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=bacarybruno&repo=code-bbblog&type=star&count=true&v=2"
        scrolling="0"
        style={{ margin: 'auto', border: 0 }}
        height={30}
      />
      <Comments />
    </div>
  );
};

const TabpaneContent = () => {
  const currentTab = useTabsStore((state) => state.currentTab);
  if (!currentTab) return null;

  let publishedAt = null;
  let readTime = null;
  if (currentTab.type === 'post' && typeof currentTab.body === 'string') {
    publishedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
    }).format(
      new Date((currentTab.sys as { publishedAt: string }).publishedAt)
    );
    readTime = `${readingTime(currentTab.body).minutes} min read`;
  }

  const Content = currentTab.body;

  return (
    <SC.TabpaneContainer>
      <SC.TabpaneContent>
        <>
          <Seo title={currentTab.title} />
          {currentTab.type === 'post' && (
            <SC.BlogPostHeader>
              <SC.BlogPostTitle>{currentTab.title}</SC.BlogPostTitle>
              <Flexbox>
                <SC.BlogPostAvatar
                  src="https://avatars.githubusercontent.com/u/14147533?s=96&v=4"
                  sizes="20vw"
                  width="24"
                  height="24"
                />
                <span>{`Bruno Bodian / ${publishedAt} ??? ${readTime}`}</span>
              </Flexbox>
            </SC.BlogPostHeader>
          )}
          <article>
            {typeof Content === 'string' ? (
              <Suspense fallback={null}>
                <Markdown content={Content} />
              </Suspense>
            ) : (
              <Content />
            )}
          </article>
          {currentTab.type === 'post' && (
            <footer>
              <BlogPostFooter />
            </footer>
          )}
        </>
      </SC.TabpaneContent>
    </SC.TabpaneContainer>
  );
};

const TabpaneHeader = () => {
  const openedTabs = useTabsStore((state) => state.openedTabs);
  const currentTab = useTabsStore((state) => state.currentTab);

  const { onOpenTab, onCloseTab } = useTabpaneActions();

  return (
    <SC.TabpaneHeaderContainer>
      <Flexbox>
        <SC.TabContainer>
          {Array.from(openedTabs.values()).map((tab) => (
            <TabpanelHeader
              title={tab.title}
              icon={tab.icon}
              key={tab.slug}
              type={tab.type === 'page' ? 'codicon' : 'seticon'}
              onClick={() =>
                onOpenTab(tab.type === 'post' ? `/posts/${tab.slug}` : tab.slug)
              }
              onClose={() => onCloseTab(tab.slug)}
              active={currentTab?.slug.toLowerCase() === tab.slug.toLowerCase()}
            />
          ))}
        </SC.TabContainer>
        <EditButton />
      </Flexbox>
    </SC.TabpaneHeaderContainer>
  );
};

export const Tabpane = () => {
  const currentTab = useTabsStore((state) => state.currentTab);

  useEffect(() => {
    if (!currentTab) return;
    const scrollElement = document.getElementById(
      window.location.hash.replace('#', '')
    );
    if (scrollElement) {
      scrollElement.scrollIntoView();
    }
  }, [currentTab]);

  return (
    <>
      <TabpaneHeader />
      <TabpaneContent />
    </>
  );
};
