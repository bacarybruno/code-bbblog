import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Codicon } from '../icon';

export const MenubarButton = styled.div`
  width: 100%;
  height: 35px;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover > i {
    color: #fff;
  }
`;

export const MenuAction = styled.div`
  height: 48px;
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover > i {
    color: #fff;
  }
  border-left: 2px solid
    ${(props) => (props['data-active'] ? 'rgb(255,255,255)' : 'unset')};
`;

export const MenuActionIcon = styled(Codicon)<{ active?: boolean }>`
  color: ${(props) =>
    props.active ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.4)'};
`;

export const Activitybar = styled.div`
  background-color: rgb(51, 51, 51);
  width: 48px;
  flex: none;
  position: absolute;
  left: 0px;
  height: calc(100% - 22px);
`;

export const LinkFill = css`
  position: absolute;
  width: 100%;
  height: inherit;
`;