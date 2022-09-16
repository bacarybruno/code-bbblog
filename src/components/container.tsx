import { styled } from "@linaria/react";

type ContainerProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
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
