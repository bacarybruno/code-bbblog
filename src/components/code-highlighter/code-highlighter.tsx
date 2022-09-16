import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { Editor, EditorConfiguration } from "codemirror";
import { useRef, useState } from "react";
import * as SC from "./styles";
import { Icon } from "../icon";

type CodeHighlighterProps = {
  code: string;
  language: string;
  inline?: boolean;
  className?: string;
};

const Controls = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="54"
    height="14"
    viewBox="0 0 54 14"
  >
    <g fill="none" fillRule="evenodd" transform="translate(1 1)">
      <circle
        cx="6"
        cy="6"
        r="6"
        fill="#FF5F56"
        stroke="#E0443E"
        strokeWidth=".5"
      />
      <circle
        cx="26"
        cy="6"
        r="6"
        fill="#FFBD2E"
        stroke="#DEA123"
        strokeWidth=".5"
      />
      <circle
        cx="46"
        cy="6"
        r="6"
        fill="#27C93F"
        stroke="#1AAB29"
        strokeWidth=".5"
      />
    </g>
  </svg>
);

const configRegex = /\/\/ meta (.*)/;

type Config =
  | { markText?: [start: number, end: number][]; fileName?: string }
  | undefined;

const CodeHighlighter = ({
  code: rawCode,
  language,
  className,
  inline,
}: CodeHighlighterProps) => {
  const editor = useRef<Editor | null>(null);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const configMatch = configRegex.exec(rawCode);
  const config: Config = configMatch ? JSON.parse(configMatch[1]) : undefined;
  const code = rawCode.replace(configRegex, "").trim();
  const options: EditorConfiguration = {
    smartIndent: true,
    mode: language,
    theme: "seti",
    viewportMargin: Infinity,
    readOnly: true,
    lineWrapping: true,
  };

  const copyCodeToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 3000);
  };

  const highlightLines = (start: number, end: number) => {
    const MAX_LINE_LENGTH = 100000;
    const from = { line: start, ch: 0 };
    const to = { line: end, ch: MAX_LINE_LENGTH };
    editor.current?.markText(from, to, {
      css: `background-color: rgba(255, 255, 255, 0.10);`,
    });
  };

  const onEditMount = (event: Editor) => {
    editor.current = event;
    if (config && Array.isArray(config.markText)) {
      config.markText.forEach(([start, end]) => {
        highlightLines(start - 1, end);
      });
    }
  };

  if (inline) {
    return <SC.Code className={className}>{code}</SC.Code>;
  }

  return (
    <SC.Wrapper>
      <SC.ControlsWrapper>
        <Controls />
        <SC.WindowTitle>{config?.fileName}</SC.WindowTitle>
        <SC.ClipboardCopy onClick={copyCodeToClipboard}>
          <Icon
            name={showCopySuccess ? "check" : "copy"}
            title="Copy to clipboard"
            size="small"
          />
        </SC.ClipboardCopy>
      </SC.ControlsWrapper>
      <CodeMirror value={code} options={options} editorDidMount={onEditMount} />
    </SC.Wrapper>
  );
};

export default CodeHighlighter;
