import { styled } from "@linaria/react";
import { Paragraph } from "../../components/markdown/styles";

export const Excerpt = styled(Paragraph)`
  margin-top: 8px;
`;

export const Article = styled.article`
  margin-bottom: 48px;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
`;
