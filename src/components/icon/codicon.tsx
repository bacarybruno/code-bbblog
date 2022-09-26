import { styled } from '@linaria/react';
import type { CSSProperties, SyntheticEvent } from 'react';

export type IconProps = {
  name: string;
  size?: 'small' | 'medium';
  className?: string;
  title: string;
  style?: CSSProperties;
  onClick?: (event: SyntheticEvent) => void;
};

const fontSizes = {
  small: 16,
  medium: 24,
};

const StyledIcon = styled.i`
  color: rgba(255, 255, 255, 0.4);
`;

export const Codicon = ({
  name,
  size = 'small',
  className,
  title,
  style,
  onClick,
}: IconProps) => {
  return (
    <StyledIcon
      className={`codicon codicon-${name} ${className}`}
      style={{ fontSize: fontSizes[size], ...style }}
      title={title}
      onClick={onClick}
    />
  );
};
