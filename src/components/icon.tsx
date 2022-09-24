import { styled } from "@linaria/react";
import type { CSSProperties, SyntheticEvent } from "react";
import JavaScriptIcon from "seti-ui/icons/javascript.svg";
import ReactIcon from "seti-ui/icons/react.svg";
import TypeScriptIcon from "seti-ui/icons/typescript.svg";
import JSONIcon from "seti-ui/icons/json.svg";
import CSSIcon from "seti-ui/icons/css.svg";
import GitIcon from "seti-ui/icons/git.svg";
import HTMLIcon from "seti-ui/icons/html.svg";
import MarkdownIcon from "seti-ui/icons/markdown.svg";
import NpmIcon from "seti-ui/icons/npm.svg";
import YarnIcon from "seti-ui/icons/yarn.svg";
import DefaultIcon from "seti-ui/icons/default.svg";

export type IconProps = {
  name: string;
  size?: "small" | "medium";
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

export const Icon = ({
  name,
  size = "small",
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

const seticons = {
  javascript: JavaScriptIcon,
  typescript: TypeScriptIcon,
  react: ReactIcon,
  json: JSONIcon,
  css: CSSIcon,
  html: HTMLIcon,
  git: GitIcon,
  markdown: MarkdownIcon,
  npm: NpmIcon,
  yarn: YarnIcon,
  default: DefaultIcon,
};

export const SvgIcon = ({
  name,
  size = "small",
  className,
  title,
  style,
  onClick,
}: IconProps) => {
  return (
    <img
      src={seticons[name as keyof typeof seticons] || seticons["default"]}
      width={fontSizes[size] * 1.5}
      height={fontSizes[size] * 1.5}
      className={className}
      title={title}
      style={style}
      onClick={onClick}
    />
  );
};
