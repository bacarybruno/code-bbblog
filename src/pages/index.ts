import homePage from "./home.md?raw";
import blogPage from "./blog.md?raw";
import projectsPage from "./projects.md?raw";
import aboutMePage from "./about.md?raw";

export type Page = {
  type: "page";
  title: string;
  body: string;
  icon: string;
  slug: string;
};

const contents = [
  {
    title: "Home",
    icon: "home",
    slug: "/home",
    body: homePage,
  },
  {
    title: "Blog",
    icon: "book",
    slug: "/blog",
    body: blogPage,
  },
  {
    title: "Projects",
    icon: "json",
    slug: "/projects",
    body: projectsPage,
  },
  {
    title: "About me",
    icon: "account",
    slug: "/about",
    body: aboutMePage,
  },
];

export const pages: Page[] = contents.map((content) => ({
  ...content,
  type: "page",
}));

export const findPage = (slug: string) =>
  pages.find((page) => page.slug.toLowerCase() === slug.toLowerCase());

export const defaultPage = pages[0];
