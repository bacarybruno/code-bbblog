import { styled } from "@linaria/react";

type ContainerProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

export const StyledContainer = styled.div`
  display: flex;
  flex: auto;
`;

export const Container = ({ children, className, style }: ContainerProps) => {
  return (
    <StyledContainer className={className} style={style}>
      {children}
    </StyledContainer>
  );
};
