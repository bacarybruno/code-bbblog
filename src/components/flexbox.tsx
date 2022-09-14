import { styled } from '@linaria/react';

type FlexboxProps = {
  className?: string;
  children: React.ReactNode;
  flexDirection?: React.CSSProperties['flexDirection'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
};

const StyledFlexbox = styled.div`
  display: flex;
  flex: 100%;
  height: 100%;
`;

export const Flexbox = ({ children, className, ...style }: FlexboxProps) => {
  return <StyledFlexbox style={style} className={className}>{children}</StyledFlexbox>;
};
