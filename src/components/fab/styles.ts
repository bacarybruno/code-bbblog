import { styled } from '@linaria/react';
import { Codicon } from '../icon';

export const Wrapper = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  bottom: 0;
  right: 0;
  margin: 35px 10px;
`;

export const Button = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgb(0,122,204);
  bottom: 0;
  border-radius: 50%;
  left: 0;
  right: 0;
  margin: auto;
  color: white;
  line-height: 60px;
  text-align: center;
  font-size: 23px;
  cursor: pointer;
`;

export const Icon = styled(Codicon)`
  color: white;
`;