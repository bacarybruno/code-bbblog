import {
  Activitybar,
  Content,
  Flexbox,
  Layout,
  Sidebar,
  MetaTags,
} from "./components";

const Home = () => {
  return (
    <>
      <MetaTags />
      <Layout>
        <Flexbox>
          <Activitybar />
          <Sidebar />
          <Content />
        </Flexbox>
      </Layout>
    </>
  );
};

export default Home;
