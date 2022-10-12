import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from './utils/analytics';
import {
  Activitybar,
  Content,
  Flexbox,
  Layout,
  Sidebar,
  Seo,
  Fab,
} from './components';

const Home = () => {
  const [location] = useLocation();

  useEffect(() => {
    setTimeout(trackPageView, 0);
  }, [location]);

  return (
    <>
      <Seo />
      <Layout>
        <Flexbox>
          <Activitybar />
          <Sidebar />
          <Content />
        </Flexbox>
        <Fab />
      </Layout>
    </>
  );
};

export default Home;
