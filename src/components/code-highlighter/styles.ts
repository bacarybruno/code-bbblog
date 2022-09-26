import { styled } from '@linaria/react';
import { Codicon } from '../icon';

export const ControlsWrapper = styled.div`
  position: relative;
  margin-left: 14px;
  margin-right: 14px;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
`;

export const WindowTitle = styled.em`
  font-family: "Fira Code", monospace;
  font-size: 1rem;
`;

export const Code = styled.span`
  color: #d7ba7d;
  font-family: "Fira Code", monospace;
  font-size: 1rem;
  line-height: 1.357rem;
`;

export const ClipboardIcon = styled(Codicon)`
  color: rgba(240, 246, 252, 0.1);
`;

export const ClipboardCopy = styled.div`
  width: 40px;
  height: 40px;
  top: 10px;
  position: relative;
  background-color: rgb(33, 38, 45);
  border: 1px solid rgba(240, 246, 252, 0.1);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition-duration: 0.1s;
  visibility: hidden;
  &:hover {
    border-color: #8b949e;
    background-color: #30363d;
  }
  &:active {
    background-color: hsla(212, 12%, 18%, 1);
    border-color: #6e7681;
  }
`;

export const Wrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  display: grid;

  --deckgo-highlight-code-font-family: "Fira Code", monospace;

  &:hover ${ClipboardCopy} {
    visibility: visible;
  }
  & > deckgo-highlight-code {
    margin-top: -40px;
  }
`;
