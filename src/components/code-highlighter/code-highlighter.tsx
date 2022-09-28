import { defineCustomElements as deckDeckGoElement } from '@deckdeckgo/highlight-code/dist/loader/index';
import type { ReactNode } from 'react';
import { useState } from 'react';
import * as SC from './styles';
import { Codicon } from '../icon';

deckDeckGoElement();

type CodeHighlighterProps = {
  code: string;
  language: string;
  inline?: boolean;
  className?: string;
};

const configRegex = /\/\/ meta (.*)/;

type HighlightCodeProps = {
  language: string;
  children: ReactNode;
  'highlight-lines'?: string;
};

type CodeConfig = {
  markText?: string;
  fileName?: string;
  lineNumbers?: boolean;
};

const CodeHighlighter = ({
  code: rawCode,
  language,
  className,
  inline,
}: CodeHighlighterProps) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const configMatch = configRegex.exec(rawCode);
  const config: CodeConfig | undefined = configMatch
    ? JSON.parse(configMatch[1])
    : undefined;
  const code = rawCode.replace(configRegex, '').trim();

  const copyCodeToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 3000);
  };

  if (inline) {
    return <SC.Code className={className}>{code}</SC.Code>;
  }

  return (
    <SC.Wrapper>
      {config?.fileName && <SC.WindowTitle>{config?.fileName}</SC.WindowTitle>}
      <SC.ControlsWrapper>
        <SC.ClipboardCopy onClick={copyCodeToClipboard}>
          <Codicon
            name={showCopySuccess ? 'check' : 'copy'}
            title="Copy to clipboard"
            size="small"
          />
        </SC.ClipboardCopy>
      </SC.ControlsWrapper>
      <deckgo-highlight-code
        language={language}
        highlight-lines={config?.markText}
        line-numbers={config?.lineNumbers}
      >
        <code slot="code">{code}</code>
      </deckgo-highlight-code>
    </SC.Wrapper>
  );
};

export default CodeHighlighter;

// TODO: move this to a .d.ts file
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'deckgo-highlight-code': HighlightCodeProps;
    }
  }
}
