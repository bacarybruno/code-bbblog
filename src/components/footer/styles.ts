import { styled } from "@linaria/react";

export const FooterButton = styled.div`
  cursor: pointer;
  display: inline-flex;
  padding: 0 5px;
  align-items: center;
  & > i {
    color: #fff;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

export const Footer = styled.footer`
  height: 22px;
  width: 100%;
  background-color: rgb(0, 122, 204);
  padding-right: 10px;
  flex: none;
`;
