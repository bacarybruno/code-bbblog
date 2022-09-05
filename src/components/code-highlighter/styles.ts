import { styled } from "@linaria/react";

export const Wrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  .CodeMirror {
    height: auto;
    padding: 48px 18px 18px 12px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgb(0 0 0 / 55%);
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

export const StyledCode = styled.span`
  color: #d7ba7d;
  font-family: "Fira Code", monospace;
  font-size: 1rem;
  line-height: 1.357rem;
`;

