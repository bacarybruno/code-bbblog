import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { isMobile } from '../utils';

interface LayoutStoreState {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const useLayoutStore = create<LayoutStoreState>()(
  immer((set) => ({
    // state
    showSidebar: isMobile() ? false : true,

    // actions
    toggleSidebar: () =>
      set((state: LayoutStoreState) => {
        state.showSidebar = !state.showSidebar;
      }),
  }))
);
