import { Activitybar, Content, Flexbox, Layout, Sidebar } from "./components";

const Home = () => {
  return (
    <Layout>
      <Flexbox>
        <Activitybar />
        <Sidebar />
        <Content />
      </Flexbox>
    </Layout>
  );
};

export default Home;
