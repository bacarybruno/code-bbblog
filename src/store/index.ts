import { enableMapSet } from "immer";
enableMapSet();

export { useTabsStore } from "./tabs-store";
export type { PageTab } from "./tabs-store";
export { useLayoutStore } from "./layout-store";