import { Link } from 'wouter';
import { useMemo } from 'react';
import type { SyntheticEvent } from 'react';
import { Flexbox, Codicon } from '../index';
import { useLayoutStore, useTabsStore } from '../../store';
import * as SC from './styles';
import { isMobile } from '../../utils';

type MenubarProps = {
  onClick: (event: SyntheticEvent) => void;
};

const Menubar = ({ onClick }: MenubarProps) => {
  return (
    <SC.MenubarButton role="button" onClick={onClick}>
      <Codicon name="menu" title="Menu" />
    </SC.MenubarButton>
  );
};

type MenuActionProps = {
  iconName: string;
  title: string;
  onClick?: (event: SyntheticEvent) => void;
  active?: boolean;
  href?: string;
};

const MenuAction = ({
  iconName,
  title,
  onClick,
  active,
  href,
}: MenuActionProps) => {
  const LinkComponent = useMemo(() => {
    if (!href && !onClick) return 'div';
    return href?.startsWith('/') ? Link : 'a';
  }, [href, onClick]);

  return (
    <SC.MenuAction
      role="button"
      title={title}
      onClick={onClick}
      data-active={active}
    >
      <LinkComponent
        href={href || ''}
        target="_blank"
        title={title}
        className={SC.LinkFill}
      />
      <SC.MenuActionIcon
        name={iconName}
        size="medium"
        title={title}
        active={active}
      />
    </SC.MenuAction>
  );
};

export const Activitybar = () => {
  const currentTab = useTabsStore((state) => state.currentTab);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  const showSidebar = useLayoutStore((state) => state.showSidebar);

  if (!showSidebar && isMobile()) {
    return null;
  }

  return (
    <SC.Activitybar>
      <Flexbox flexDirection="column" justifyContent="space-between">
        <div>
          <Menubar onClick={toggleSidebar} />
          <MenuAction
            iconName="home"
            title="Home"
            href="/"
            active={currentTab?.slug.toLowerCase() === '/'}
          />
          <MenuAction iconName="search" title="Search" href="" />
          <MenuAction
            iconName="account"
            title="About me"
            href="/about"
            active={currentTab?.slug.toLowerCase() === '/about'}
          />
          <MenuAction
            iconName="book"
            title="Blog"
            href="/blog"
            active={currentTab?.slug.toLowerCase() === '/blog'}
          />
          <MenuAction
            iconName="json"
            title="My projects"
            href="https://github.com/bacarybruno?tab=repositories"
          />
        </div>
        <div>
          <MenuAction
            iconName="github"
            title="View this on GitHub"
            href="https://github.com/bacarybruno/code-bbblog"
          />
          <MenuAction iconName="settings-gear" title="Settings" />
        </div>
      </Flexbox>
    </SC.Activitybar>
  );
};
