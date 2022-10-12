import type { ReactNode } from 'react';
import { Flexbox } from './flexbox';
import { Footer } from './footer/footer';
import { Container } from './container';

type LayoutProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flexbox flexDirection="column">
      <Container style={{ height: 'calc(100% - 22px)' }}>{children}</Container>
      <Footer />
    </Flexbox>
  );
};
