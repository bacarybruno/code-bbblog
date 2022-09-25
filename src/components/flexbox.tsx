import { styled } from '@linaria/react';
import type { CSSProperties, ReactNode } from 'react';

type FlexboxProps = {
  className?: string;
  children: ReactNode;
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  flex?: CSSProperties['flex'];
};

const Wrapper = styled.div`
  display: flex;
  flex: 100%;
  height: 100%;
`;

export const Flexbox = ({ children, className, ...style }: FlexboxProps) => {
  return <Wrapper style={style} className={className}>{children}</Wrapper>;
};
