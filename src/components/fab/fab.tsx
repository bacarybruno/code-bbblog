import { useLayoutStore } from '../../store';
import { isMobile } from '../../utils';
import * as SC from './styles';

export const Fab = () => {
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  if (!isMobile()) {
    return null;
  }

  return (
    <SC.Wrapper>
      <SC.Button onClick={toggleSidebar}>
        <SC.Icon name="menu" title="Menu" />
      </SC.Button>
    </SC.Wrapper>
  );
};
