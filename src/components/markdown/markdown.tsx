import React, { Suspense, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { HeadingProps } from "react-markdown/lib/ast-to-react";
import * as SC from "./styles";
import { slugify } from "../../utils/slugify";

const CodeHighlighter = React.lazy(
  () => import("../code-highlighter/code-highlighter")
);

type MarkdownProps = {
  content: string;
};

const renderHeader = ({ level, children }: HeadingProps) => {
  const [hovered, setHovered] = useState(false);
  const HeadingElement = `h${level}` as
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

  const text = children[0];
  const anchorId = slugify(typeof text === "string" ? text : "");

  return (
    <HeadingElement
      id={anchorId}
      className={SC.headerClassName}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && <SC.Anchor href={`#${anchorId}`}>#</SC.Anchor>}
    </HeadingElement>
  );
};

const components: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  img: (props) => {
    return (
      <a href={props.src} target="_blank">
        <SC.Img {...props} referrerPolicy="no-referrer" />
      </a>
    );
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
  a: ({ href, children, className }) => {
    return (
      <SC.Link href={href} target="_blank" className={className}>
        {children}
      </SC.Link>
    );
  },
  header: (props) => {
    return <SC.Header {...props} />;
  },
  h1: renderHeader,
  h2: renderHeader,
  h3: renderHeader,
  h4: renderHeader,
  h5: renderHeader,
  h6: renderHeader,
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
