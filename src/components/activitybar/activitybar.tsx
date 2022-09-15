import { useLocation } from "wouter";
import { Flexbox, Icon } from "../index";
import { useLayoutStore, useTabsStore } from "../../store";
import {
  StyledActivitybar,
  StyledMenuAction,
  StyledMenuActionIcon,
  StyledMenubarButton,
} from "./styles";

type MenubarProps = {
  onClick: (event: React.SyntheticEvent) => void;
};

const Menubar = ({ onClick }: MenubarProps) => {
  return (
    <StyledMenubarButton role="button" onClick={onClick}>
      <Icon name="menu" title="Menu" />
    </StyledMenubarButton>
  );
};

type MenuActionProps = {
  iconName: string;
  title: string;
  onClick: (event: React.SyntheticEvent) => void;
  active?: boolean;
};

const MenuAction = ({ iconName, title, onClick, active }: MenuActionProps) => {
  return (
    <StyledMenuAction
      role="button"
      title={title}
      onClick={onClick}
      active={active}
    >
      <StyledMenuActionIcon
        name={iconName}
        size="medium"
        title={title}
        active={active}
      />
    </StyledMenuAction>
  );
};

export const Activitybar = () => {
  const [_, setLocation] = useLocation();
  const currentTab = useTabsStore((state) => state.currentTab);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  return (
    <StyledActivitybar>
      <Flexbox flexDirection="column" justifyContent="space-between">
        <div>
          <Menubar onClick={toggleSidebar} />
          <MenuAction
            iconName="home"
            title="Home"
            onClick={() => setLocation("/")}
            active={currentTab?.slug.toLowerCase() === "/"}
          />
          <MenuAction iconName="search" title="Search" onClick={() => null} />
          <MenuAction
            iconName="account"
            title="About me"
            onClick={() => setLocation("/about")}
            active={currentTab?.slug.toLowerCase() === "/about"}
          />
          <MenuAction
            iconName="book"
            title="Blog"
            onClick={() => setLocation("/blog")}
            active={currentTab?.slug.toLowerCase() === "/blog"}
          />
          <MenuAction
            iconName="json"
            title="My projects"
            onClick={() => setLocation("/projects")}
            active={currentTab?.slug.toLowerCase() === "/projects"}
          />
        </div>
        <div>
          <MenuAction
            iconName="github"
            title="View this on GitHub"
            onClick={() => null}
          />
          <MenuAction
            iconName="settings-gear"
            title="Settings"
            onClick={() => null}
          />
        </div>
      </Flexbox>
    </StyledActivitybar>
  );
};
