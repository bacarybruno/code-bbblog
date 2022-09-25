import { useLocation } from 'wouter';
import type { SyntheticEvent } from 'react';
import { Flexbox, Icon } from '../index';
import { useLayoutStore, useTabsStore } from '../../store';
import * as SC from './styles';

type MenubarProps = {
  onClick: (event: SyntheticEvent) => void;
};

const Menubar = ({ onClick }: MenubarProps) => {
  return (
    <SC.MenubarButton role="button" onClick={onClick}>
      <Icon name="menu" title="Menu" />
    </SC.MenubarButton>
  );
};

type MenuActionProps = {
  iconName: string;
  title: string;
  onClick: (event: SyntheticEvent) => void;
  active?: boolean;
};

const MenuAction = ({ iconName, title, onClick, active }: MenuActionProps) => {
  return (
    <SC.MenuAction
      role="button"
      title={title}
      onClick={onClick}
      active={active}
    >
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
  const [, setLocation] = useLocation();
  const currentTab = useTabsStore((state) => state.currentTab);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  return (
    <SC.Activitybar>
      <Flexbox flexDirection="column" justifyContent="space-between">
        <div>
          <Menubar onClick={toggleSidebar} />
          <MenuAction
            iconName="home"
            title="Home"
            onClick={() => setLocation('/')}
            active={currentTab?.slug.toLowerCase() === '/'}
          />
          <MenuAction iconName="search" title="Search" onClick={() => null} />
          <MenuAction
            iconName="account"
            title="About me"
            onClick={() => setLocation('/about')}
            active={currentTab?.slug.toLowerCase() === '/about'}
          />
          <MenuAction
            iconName="book"
            title="Blog"
            onClick={() => setLocation('/blog')}
            active={currentTab?.slug.toLowerCase() === '/blog'}
          />
          <MenuAction
            iconName="json"
            title="My projects"
            onClick={() => window.open('https://github.com/bacarybruno?tab=repositories', '_blank')}
          />
        </div>
        <div>
          <MenuAction
            iconName="github"
            title="View this on GitHub"
            onClick={() => window.open('https://github.com/bacarybruno/code-bbblog', '_blank')}
          />
          <MenuAction
            iconName="settings-gear"
            title="Settings"
            onClick={() => null}
          />
        </div>
      </Flexbox>
    </SC.Activitybar>
  );
};
