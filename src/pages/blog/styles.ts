import { styled } from '@linaria/react';
import { Paragraph } from '../../components/markdown/styles';
import { Link as WouterLink } from 'wouter';

export const Excerpt = styled(Paragraph)`
  margin-top: 8px;
`;

export const Article = styled.article`
  margin-bottom: 48px;
`;

export const Link = styled(WouterLink)`
  color: #3794ff;
  outline-color: #3794ff;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  margin-bottom: 0.2em;
`;
