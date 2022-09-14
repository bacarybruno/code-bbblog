import create from "zustand";
import { immer } from "zustand/middleware/immer";

export interface PageTab {
  type: "page" | "post";
  title: string;
  slug: string;
  body: string;
  icon: string;
  [key: string]: unknown;
}

interface TabsStoreState {
  openedTabs: PageTab[];
  currentTab: PageTab | null;
  openTab: (tab: PageTab) => void;
  closeTab: (slug: string) => void;
  focusTab: (tab: PageTab | null) => void;
}

export const useTabsStore = create<TabsStoreState>()(
  immer((set) => ({
    // state
    openedTabs: [],
    currentTab: null,

    // actions
    openTab: (tab) =>
      set((state: TabsStoreState) => {
        state.openedTabs.push(tab);
      }),
    closeTab: (slug) =>
      set((state: TabsStoreState) => {
        state.openedTabs = state.openedTabs.filter(
          (openedTab) => openedTab.slug.toLowerCase() !== slug.toLowerCase()
        );
      }),
    focusTab: (tab) =>
      set((state: TabsStoreState) => {
        state.currentTab = tab;
      }),
  }))
);

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
