import { styled } from '@linaria/react';
import { Container, Codicon as Icon } from '../index';
import { Header } from '../markdown/styles';
export { Paragraph } from '../markdown/styles';

export const TabpanelIcon = styled(Icon)<{ active?: boolean }>`
  padding: 2px;
  border-radius: 5px;
  margin-left: 4px;
  color: ${(props) =>
    props.active ? 'rgb(204, 204, 204)' : 'rgba(255, 255, 255, 0.4)'};

  &:hover {
    background-color: rgba(90, 93, 94, 0.31);
  }

  &:active {
    background-color: rgba(99, 102, 103, 0.31);
  }
`;

export const TabpanelAction = styled.div`
  align-items: center;
  display: flex;
  width: 28px;
  flex: none;
`;

export const TabpanelHeader = styled.div<{ active?: boolean }>`
  border-right: 1px solid rgb(37, 37, 38);
  padding-left: 10px;
  display: flex;
  flex: none;
  align-items: center;
  background-color: ${(props) =>
    props.active ? 'rgb(30, 30, 30)' : 'rgb(45, 45, 45)'};
  color: ${(props) =>
    props.active ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.5)'};
`;

export const Codicon = styled(Icon)`
  margin-right: 6px;
`;

export const TabpanelTitle = styled.span`
  display: flex;
  align-self: center;
`;

export const TabpaneHeaderContainer = styled.div`
  height: 35px;
  background-color: rgb(37, 37, 38);
  cursor: pointer;
  flex: none;
`;

export const TabpaneContainer = styled.div`
  overflow: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 14px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-left: 1px solid rgba(127, 127, 127, 0.3);
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(121, 121, 121, 0.4);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 100, 100, 0.7);
  }

  /* Handle on active */
  &::-webkit-scrollbar-thumb:active {
    background: rgba(191, 191, 191, 0.4);
  }
`;

export const TabpaneContent = styled.div`
  margin: 0 auto;
  max-width: 80%;
  padding-top: 20px;
  padding-bottom: 100px;
`;

export const TabContainer = styled(Container)`
  overflow-x: auto;

  /* width */
  &::-webkit-scrollbar {
    height: 3px !important;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(121, 121, 121, 0.4);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 100, 100, 0.7);
  }

  /* Handle on active */
  &::-webkit-scrollbar-thumb:active {
    background: rgba(191, 191, 191, 0.4);
  }
`;

export const BlogPostAvatar = styled.img`
  border-radius: 9999px;
  margin-right: 8px;
`;

export const BlogPostTitle = styled(Header)`
  padding: 0px;
  margin-bottom: 8px;
`;

export const BlogPostHeader = styled.div`
  margin-bottom: 36px;
`;