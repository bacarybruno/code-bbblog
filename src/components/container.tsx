import { styled } from "@linaria/react";
import type { CSSProperties, ReactNode } from "react";

type ContainerProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export const Wrapper = styled.div`
  display: flex;
  flex: auto;
`;

export const Container = ({ children, className, style }: ContainerProps) => {
  return (
    <Wrapper className={className} style={style}>
      {children}
    </Wrapper>
  );
};
