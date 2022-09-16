import React, { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react";
import rehypeRaw from "rehype-raw";
import * as SC from "./styles";
import { slugify } from "../../utils/slugify";

const CodeHighlighter = React.lazy(
  () => import("../code-highlighter/code-highlighter")
);

type MarkdownProps = {
  content: string;
};

const components: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  img: (props) => {
    return <SC.Img {...props} referrerPolicy="no-referrer" />;
  },
  code: ({ inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "javascript";
    return (
      <Suspense fallback={null}>
        <CodeHighlighter
          code={String(children)}
          language={language}
          inline={inline}
          className={className}
        />
      </Suspense>
    );
  },
  button: ({ onClick, disabled, children }) => {
    return (
      <VSCodeButton onClick={onClick} disabled={disabled}>
        {children}
      </VSCodeButton>
    );
  },
  a: ({ href, children, className }) => {
    return (
      <VSCodeLink href={href} target="_blank" className={className}>
        {children}
      </VSCodeLink>
    );
  },
  header: (props) => {
    return <SC.Header {...props} />;
  },
  h1: (props) => {
    const text = props.children[0];
    const anchorId = slugify(typeof text === "string" ? text : "");
    return (
      <h1 {...props} id={anchorId} className={SC.headerClassName}>
        {text}
        <SC.Anchor href={`#${anchorId}`}>#</SC.Anchor>
      </h1>
    );
  },
  h2: (props) => {
    const text = props.children[0];
    const anchorId = slugify(typeof text === "string" ? text : "");
    return (
      <h2 {...props} id={anchorId} className={SC.headerClassName}>
        {text}
        <SC.Anchor href={`#${anchorId}`}>#</SC.Anchor>
      </h2>
    );
  },
  h3: (props) => {
    const text = props.children[0];
    const anchorId = slugify(typeof text === "string" ? text : "");
    return (
      <h3 {...props} id={anchorId} className={SC.headerClassName}>
        {text}
        <SC.Anchor href={`#${anchorId}`}>#</SC.Anchor>
      </h3>
    );
  },
  h4: (props) => {
    const text = props.children[0];
    const anchorId = slugify(typeof text === "string" ? text : "");
    return (
      <h4 {...props} id={anchorId} className={SC.headerClassName}>
        {text}
        <SC.Anchor href={`#${anchorId}`}>#</SC.Anchor>
      </h4>
    );
  },
  h5: (props) => {
    const text = props.children[0];
    const anchorId = slugify(typeof text === "string" ? text : "");
    return (
      <h5 {...props} id={anchorId} className={SC.headerClassName}>
        {text}
        <SC.Anchor href={`#${anchorId}`}>#</SC.Anchor>
      </h5>
    );
  },
  h6: (props) => {
    const text = props.children[0];
    const anchorId = slugify(typeof text === "string" ? text : "");
    return (
      <h6 {...props} id={anchorId} className={SC.headerClassName}>
        {text}
        <SC.Anchor href={`#${anchorId}`}>#</SC.Anchor>
      </h6>
    );
  },
  p: (props) => {
    return <SC.Paragraph {...props} />;
  },
  li: (props) => {
    return <SC.Li {...props} />;
  },
};

const Markdown = ({ content }: MarkdownProps) => {
  return (
    <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
