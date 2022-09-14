import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Flexbox, SvgIcon, MetaTags } from "../index";
import { PageTab, useTabsStore } from "../../store";
import { defaultPage, findPage } from "../../pages";
import { usePost } from "../../hooks";
import {
  StyledCodicon,
  StyledTabpaneContainer,
  StyledTabpaneContent,
  StyledTabpaneHeaderContainer,
  StyledTabpanelAction,
  StyledTabpanelHeader,
  StyledTabpanelIcon,
  StyledTabpanelTitle,
  TabContainer,
} from "./styles";
import {
  StyledHeader as BlogPostHeader,
  StyledParagraph,
} from "../markdown/styles";

const Markdown = React.lazy(() => import("../markdown/markdown"));

type TabpanelIconProps = {
  active?: boolean;
  name: string;
  title: string;
  onClick: (event: React.SyntheticEvent) => void;
};

const TabpanelIcon = ({ active, name, title, onClick }: TabpanelIconProps) => {
  return (
    <StyledTabpanelIcon
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
  onClick: (event: React.SyntheticEvent) => void;
  type: "seticon" | "codicon";
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

  const onCloseTab = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <StyledTabpanelHeader
      active={active}
      onMouseOver={() => setShowCloseIcon(true)}
      onMouseLeave={() => setShowCloseIcon(false)}
      title={title}
      onClick={onClick}
    >
      {type === "codicon" && <StyledCodicon name={icon} title={title} />}
      {type === "seticon" && <SvgIcon name={icon} title={title} />}
      <StyledTabpanelTitle>{title}</StyledTabpanelTitle>
      <StyledTabpanelAction>
        {showCloseIcon && (
          <TabpanelIcon
            name="close"
            active={active}
            title="Close"
            onClick={onCloseTab}
          />
        )}
      </StyledTabpanelAction>
    </StyledTabpanelHeader>
  );
};

const EditButton = () => {
  return (
    <StyledTabpanelAction>
      <TabpanelIcon
        name="edit"
        active
        title="Suggest a modification"
        onClick={() => {}}
      />
    </StyledTabpanelAction>
  );
};

const useTabpaneActions = () => {
  const [location, setLocation] = useLocation();
  const [matchPosts, params] = useRoute("/posts/:slug");

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

  const isCurrentPageOpened = openedTabs.find(
    (tab) => tab.slug.toLowerCase() === page?.slug?.toLowerCase()
  );

  const onCloseTab = (tabSlug: string) => {
    if (openedTabs.length === 1 && openedTabs[0].slug === tabSlug) {
      if (tabSlug === defaultPage.slug) return;
      closeTab(tabSlug);
      openTab(defaultPage);
      setLocation(defaultPage.slug);
      return;
    }

    closeTab(tabSlug);

    const isCurrentlyOpenedTab =
      currentTab?.slug.toLowerCase() === tabSlug.toLowerCase();

    if (isCurrentlyOpenedTab) {
      const otherTabs = openedTabs.filter(
        (openedTab) => openedTab.slug.toLowerCase() !== tabSlug.toLowerCase()
      );
      const newFocusedTab = otherTabs[otherTabs.length - 1] || null;
      focusTab(newFocusedTab);
      setLocation(newFocusedTab?.slug ?? defaultPage.slug);
    }
  };

  useEffect(() => {
    if (enabled && isLoading) {
      return;
    }

    if (!page) {
      return setLocation("/home");
    }

    const newTab: PageTab = {
      ...page,
      type: matchPosts ? "post" : "page",
    };

    if (!isCurrentPageOpened) {
      openTab(newTab);
    }

    focusTab(newTab);
  }, [enabled, isLoading, page, isCurrentPageOpened, matchPosts]);

  return {
    onOpenTab: setLocation,
    onCloseTab,
  };
};

const BlogPostFooter = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <hr />
      <StyledParagraph>
        <em>Love what you are reading ? Give a ⭐️ to show your support ❤️</em>
      </StyledParagraph>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=bacarybruno&repo=code-bbblog&type=star&count=true&v=2"
        scrolling="0"
        style={{ margin: "auto", border: 0 }}
        height={30}
      />
    </div>
  );
};

const TabpaneContent = () => {
  const currentTab = useTabsStore((state) => state.currentTab);

  if (!currentTab) return null;

  return (
    <StyledTabpaneContainer>
      <StyledTabpaneContent>
        <>
          <MetaTags title={currentTab.title} />
          {currentTab.type === "post" && (
            <header>
              <BlogPostHeader>{currentTab.title}</BlogPostHeader>
            </header>
          )}
          <article>
            <Suspense fallback={null}>
              <Markdown content={currentTab.body} />
            </Suspense>
          </article>
          {currentTab.type === "post" && (
            <footer>
              <BlogPostFooter />
            </footer>
          )}
        </>
      </StyledTabpaneContent>
    </StyledTabpaneContainer>
  );
};

const TabpaneHeader = () => {
  const openedTabs = useTabsStore((state) => state.openedTabs);
  const currentTab = useTabsStore((state) => state.currentTab);

  const { onOpenTab, onCloseTab } = useTabpaneActions();

  return (
    <StyledTabpaneHeaderContainer>
      <Flexbox>
        <TabContainer>
          {openedTabs.map((tab) => (
            <TabpanelHeader
              title={tab.title}
              icon={tab.icon}
              key={tab.slug}
              type={tab.type === "page" ? "codicon" : "seticon"}
              onClick={() =>
                onOpenTab(tab.type === "post" ? `/posts/${tab.slug}` : tab.slug)
              }
              onClose={() => onCloseTab(tab.slug)}
              active={currentTab?.slug.toLowerCase() === tab.slug.toLowerCase()}
            />
          ))}
        </TabContainer>
        <EditButton />
      </Flexbox>
    </StyledTabpaneHeaderContainer>
  );
};

export const Tabpane = () => {
  const currentTab = useTabsStore((state) => state.currentTab);

  useEffect(() => {
    if (!currentTab) return;
    const scrollElement = document.getElementById(
      window.location.hash.replace("#", "")
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
