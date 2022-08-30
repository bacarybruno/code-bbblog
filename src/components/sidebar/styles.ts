import { styled } from "@linaria/react";
import { Container } from "../container";
import { Icon, SvgIcon } from "../icon";

export const StyledSidebar = styled.nav`
  width: 300px;
  flex: none;
  background-color: rgb(37, 37, 38);
  outline-color: rgba(83, 89, 93, 0.5);
  position: absolute;
  left: 48px;
  height: calc(100% - 22px);
`;

export const SidebarTitle = styled.div`
  display: flex;
  height: 35px;
  line-height: 35px;
  padding-left: 20px;
  padding-right: 8px;
  text-overflow: ellipsis;

  & > h2 {
    color: rgb(187, 187, 187);
    text-transform: uppercase;
    font-size: 11px;
    cursor: default;
    font-weight: 400;
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const StyledBorder = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(204, 204, 204, 0.2);
`;

export const StyledH3 = styled.h3`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

export const SidebarPanel = styled.div<{ noBorder?: boolean }>`
  width: 100%;
  height: 22px;
  align-items: center;
  display: flex;
  cursor: pointer;
  & > i {
    margin: 0 2px;
  }
`;

export const PanelIcon = styled(Icon)`
  color: #c5c5c5;
`;

export const ListItem = styled.li<{ active?: boolean }>`
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#37373d" : "transparent")};
  &:hover {
    background-color: #2a2d2e;
  }
`;

export const StyledIcon = styled(SvgIcon)`
  margin-right: 6px;
  color: #c5c5c5;
`;

export const PostsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;
