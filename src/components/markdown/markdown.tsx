import { Suspense, useState, lazy } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import * as SC from './styles';
import { slugify } from '../../utils/slugify';

const CodeHighlighter = lazy(
  () => import('../code-highlighter/code-highlighter')
);

type MarkdownProps = {
  content: string;
};

type HeadingProps = {
  level: number;
  children: ReactNode[];
};

const Heading = ({ level, children }: HeadingProps) => {
  const [hovered, setHovered] = useState(false);
  const HeadingElement = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const text = children[0];
  const anchorId = slugify(typeof text === 'string' ? text : '');

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

const components: ComponentProps<typeof ReactMarkdown>['components'] = {
  img: (props) => {
    return (
      <SC.Img
        {...props}
        referrerPolicy="no-referrer"
        onClick={() => window.open(props.src, '_blank')}
      />
    );
  },
  code: ({ inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'javascript';
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
  h1: ({ level, children }) => <Heading level={level}>{children}</Heading>,
  h2: ({ level, children }) => <Heading level={level}>{children}</Heading>,
  h3: ({ level, children }) => <Heading level={level}>{children}</Heading>,
  h4: ({ level, children }) => <Heading level={level}>{children}</Heading>,
  h5: ({ level, children }) => <Heading level={level}>{children}</Heading>,
  h6: ({ level, children }) => <Heading level={level}>{children}</Heading>,
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
