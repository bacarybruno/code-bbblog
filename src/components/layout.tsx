import { Flexbox } from "./flexbox";
import { Footer } from "./footer/footer";
import { Container } from "./container";

type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flexbox flexDirection="column">
      <Container>{children}</Container>
      <Footer />
    </Flexbox>
  );
};
