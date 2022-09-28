import { styled } from '@linaria/react';
import { Link } from 'wouter';
import { Container } from '../container';
import { Codicon as BaseIcon, SvgIcon } from '../icon';

export const Sidebar = styled.nav`
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

export const Border = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(204, 204, 204, 0.2);
`;

export const H3 = styled.h3`
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

export const PanelIcon = styled(BaseIcon)`
  color: #c5c5c5;
`;

export const ListItem = styled(Link)`
  color: #ccc;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props['data-active'] ? '#37373d' : 'transparent')};
  &:hover {
    background-color: ${(props) => (props['data-active'] ? '#37373d' : '#2a2d2e')};
    text-decoration: none;
  }
`;

export const Icon = styled(SvgIcon)`
  margin-right: 6px;
`;

export const PostsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;
