import "codemirror/mode/javascript/javascript";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { EditorConfiguration } from "codemirror";
import { useRef } from "react";
import { ControlsWrapper, EditorWrapper, StyledCode, Wrapper } from "./styles";

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

export const CodeHighlighter = ({
  code,
  language,
  className,
  inline,
}: CodeHighlighterProps) => {
  const editor = useRef<any>();
  const wrapper = useRef<any>();

  const options: EditorConfiguration = {
    smartIndent: true,
    mode: language,
    theme: "seti",
    viewportMargin: Infinity,
    readOnly: true,
    lineWrapping: true,
  };

  const editorWillUnmount = () => {
    editor.current.display.wrapper.remove();
    wrapper.current.hydrated = false;
  };

  if (inline) {
    return <StyledCode className={className}>{code}</StyledCode>;
  }

  return (
    <Wrapper>
      <EditorWrapper>
        <div>
          <ControlsWrapper>
            <Controls />
          </ControlsWrapper>
          <CodeMirror
            value={String(code).replace(/\n$/, "")}
            options={options}
            ref={wrapper}
            editorDidMount={(e) => (editor.current = e)}
            editorWillUnmount={editorWillUnmount}
          />
        </div>
      </EditorWrapper>
    </Wrapper>
  );
};
