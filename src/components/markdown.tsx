import ReactMarkdown from "react-markdown";
import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react";
import rehypeRaw from "rehype-raw";
import { styled } from "@linaria/react";
import { CodeHighlighter } from "./index";

type MarkdownProps = {
  content: string;
};

const StyledImg = styled.img`
  && {
    max-width: 100%;
    margin-top: 24px;
    margin-bottom: 8px;
  }
  & + em {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
`;

const StyledH1 = styled.h1`
  padding: 5px 0 0;
  border: none;
  font-size: 2.7em;
`;

const StyledParagraph = styled.p`
  font-size: 1.17rem;
  & > vscode-link {
    font-size: unset;
  }
  & > img {
    display: flex;
    margin: auto;
  }
`;

const StyledLi = styled.li`
  font-size: 1.1rem;
  & > vscode-link {
    font-size: unset;
  }
`;

const StyledVSCodeLink = styled(VSCodeLink)`
  font-size: inherit;
`;

const components: React.ComponentProps<typeof ReactMarkdown>["components"] = {
  img: (props) => {
    return <StyledImg {...props} referrerPolicy="no-referrer" />;
  },
  code: ({ inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "javascript";
    return (
      <CodeHighlighter
        code={String(children)}
        language={language}
        inline={inline}
        className={className}
      />
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
      <StyledVSCodeLink href={href} target="_blank" className={className}>
        {children}
      </StyledVSCodeLink>
    );
  },
  header: (props) => {
    return <StyledH1 {...props} />;
  },
  p: (props) => {
    return <StyledParagraph {...props} />;
  },
  li: (props) => {
    return <StyledLi {...props} />;
  },
};

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  );
};
