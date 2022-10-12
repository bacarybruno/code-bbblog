import { styled } from '@linaria/react';
import { Flexbox } from './flexbox';
import { Tabpane } from './tabpane/tabpane';

const Wrapper = styled.div`
  background-color: rgb(30, 30, 30);
  overflow: hidden;
  width: 100%;
`;

export const Content = () => {
  return (
    <Wrapper>
      <Flexbox flexDirection="column">
        <Tabpane />
      </Flexbox>
    </Wrapper>
  );
};
