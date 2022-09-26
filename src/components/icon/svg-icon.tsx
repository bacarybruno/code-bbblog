import { styled } from '@linaria/react';
import type { CSSProperties, SyntheticEvent, FunctionComponent } from 'react';
import { ReactComponent as JavaScriptIcon } from 'seti-ui/icons/javascript.svg';
import { ReactComponent as ReactIcon } from 'seti-ui/icons/react.svg';
import { ReactComponent as TypeScriptIcon } from 'seti-ui/icons/typescript.svg';
import { ReactComponent as JSONIcon } from 'seti-ui/icons/json.svg';
import { ReactComponent as CSSIcon } from 'seti-ui/icons/css.svg';
import { ReactComponent as GitIcon } from 'seti-ui/icons/git.svg';
import { ReactComponent as HTMLIcon } from 'seti-ui/icons/html.svg';
import { ReactComponent as MarkdownIcon } from 'seti-ui/icons/markdown.svg';
import { ReactComponent as NpmIcon } from 'seti-ui/icons/npm.svg';
import { ReactComponent as YarnIcon } from 'seti-ui/icons/yarn.svg';
import { ReactComponent as DefaultIcon } from 'seti-ui/icons/default.svg';

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

const StyledSVGIcon = styled.i<{ size: number; color: string; }>`
  width: ${(props) => `${props.size}`}px;
  height: ${(props) => `${props.size}`}px;
  display: flex;
  flex: none;
  &&.variation > svg > path {
    fill: ${(props) => props.color};
  }
`;

const seticons: Record<
  string,
  FunctionComponent | { color: string; component: FunctionComponent }
> = {
  javascript: JavaScriptIcon,
  spec_javascript: {
    color: '#e37933',
    component: JavaScriptIcon,
  },
  typescript: TypeScriptIcon,
  react: ReactIcon,
  spec_react: {
    color: '#e37933',
    component: ReactIcon,
  },
  json: JSONIcon,
  css: CSSIcon,
  html: HTMLIcon,
  git: GitIcon,
  markdown: MarkdownIcon,
  npm: NpmIcon,
  yarn: YarnIcon,
  default: DefaultIcon,
};

const getSvgIconProps = (name: string) => {
  let Component = seticons[name as keyof typeof seticons];
  let color: string | null = '';
  if ('color' in Component) {
    const component = Component['component'];
    color = Component['color'];
    Component = component;
  }
  return {
    Component,
    color,
  };
};

export const SvgIcon = ({
  name,
  size = 'small',
  className,
  title,
  style,
  onClick,
}: IconProps) => {
  const { color, Component } = getSvgIconProps(name);

  return (
    <StyledSVGIcon
      size={fontSizes[size] * 1.5}
      onClick={onClick}
      className={`${className} ${color ? 'variation' : ''}`}
      style={style}
      title={title}
      color={color}
    >
      <Component />
    </StyledSVGIcon>
  );
};
