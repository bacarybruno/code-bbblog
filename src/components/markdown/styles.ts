import { styled } from '@linaria/react';
import { css } from '@linaria/core';

export const Link = styled.a`
  color: #3794ff;
  outline-color: #3794ff;
`;

export const Anchor = styled(Link)`
  padding-left: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

export const Img = styled.img`
  && {
    max-width: 100%;
    margin-top: 24px;
    margin-bottom: 8px;
  }
  & + em {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
`;

export const Header = styled.h1`
  padding: 5px 0 0;
  border: none;
  font-size: 2.7em;
`;

export const Paragraph = styled.p`
  font-size: 1.17rem;
  & > img {
    display: flex;
    margin: auto;
  }
`;

export const headerClassName = css`
  cursor: pointer;
`;

export const Li = styled.li`
  font-size: 1.1rem;
`;
