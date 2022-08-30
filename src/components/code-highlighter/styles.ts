import { styled } from "@linaria/react";

export const Wrapper = styled.div`
  .CodeMirror {
    width: fit-content;
    min-width: 360px;
    height: auto;
    padding: 48px 18px 18px 12px;
    border-radius: 5px;
    box-shadow: 0 20px 68px rgb(0 0 0 / 55%);
    font-family: "Fira Code", monospace;
    font-size: 1rem;
    line-height: 1.357rem;
  }
  .CodeMirror-cursor {
    display: none !important;
  }
`;

export const ControlsWrapper = styled.div`
  margin-top: -24px;
  position: relative;
  top: 34px;
  margin-left: 14px;
  margin-right: 0px;
  z-index: 2;
  text-align: initial;
`;

export const EditorWrapper = styled.div`
  background-color: rgb(0, 122, 204);
  min-width: 90px;
  max-width: 1024px;
  padding: 56px 12%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCode = styled.span`
  color: #d7ba7d;
  font-family: "Fira Code", monospace;
  font-size: 1rem;
  line-height: 1.357rem;
`;

