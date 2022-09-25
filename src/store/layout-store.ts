import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface LayoutStoreState {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const useLayoutStore = create<LayoutStoreState>()(
  immer((set) => ({
    // state
    showSidebar: true,

    // actions
    toggleSidebar: () =>
      set((state: LayoutStoreState) => {
        state.showSidebar = !state.showSidebar;
      }),
  }))
);
