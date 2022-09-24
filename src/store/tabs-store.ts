import type { FunctionComponent } from "react";
import create from "zustand";
import { immer } from "zustand/middleware/immer";

export interface PageTab {
  type: "page" | "post";
  title: string;
  slug: string;
  body: string | FunctionComponent;
  icon: string;
  [key: string]: unknown;
}

interface TabsStoreState {
  openedTabs: Map<string, PageTab>;
  currentTab: PageTab | null;
  openTab: (tab: PageTab) => void;
  closeTab: (slug: string) => void;
  focusTab: (tab: PageTab | null) => void;
}

export const useTabsStore = create<TabsStoreState>()(
  immer((set) => ({
    // state
    openedTabs: new Map(),
    currentTab: null,

    // actions
    openTab: (tab) =>
      set((state: TabsStoreState) => {
        state.openedTabs.set(tab.slug, tab);
      }),
    closeTab: (slug) =>
      set((state: TabsStoreState) => {
        state.openedTabs.delete(slug);
      }),
    focusTab: (tab) =>
      set((state: TabsStoreState) => {
        state.currentTab = tab;
      }),
  }))
);
