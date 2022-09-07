import { styled } from "@linaria/react";
import { css } from "@linaria/core";

export const Anchor = styled.a`
  padding-left: 0.5rem;
  color: #3794ff;
  visibility: hidden;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledImg = styled.img`
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

export const StyledHeader = styled.h1`
  padding: 5px 0 0;
  border: none;
  font-size: 2.7em;
`;

export const StyledParagraph = styled.p`
  font-size: 1.17rem;
  & > vscode-link {
    font-size: unset;
  }
  & > img {
    display: flex;
    margin: auto;
  }
`;

export const headerClassName = css`
  cursor: pointer;
  &:hover ${Anchor} {
    visibility: visible;
  }
`;

export const StyledLi = styled.li`
  font-size: 1.1rem;
  & > vscode-link {
    font-size: unset;
  }
`;
