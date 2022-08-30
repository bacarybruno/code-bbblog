import { styled } from "@linaria/react";
import { useLayoutStore } from "../store";
import { StyledContainer } from "./container";
import { Flexbox } from "./flexbox";
import { Tabpane } from "./tabpane/tabpane";

const StyledContent = styled(StyledContainer)`
  background-color: rgb(30, 30, 30);
  position: absolute;
  left: ${props => props.showSidebar ? 348 : 48}px;
  transition: 100ms;
  height: calc(100% - 22px);
  overflow: hidden;
  // FIXME: use a better stylesheet
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
`;

export const Content = () => {
  const showSidebar = useLayoutStore((state) => state.showSidebar);
  return (
    <StyledContent showSidebar={showSidebar}>
      <Flexbox flexDirection="column">
        <Tabpane />
      </Flexbox>
    </StyledContent>
  );
};
