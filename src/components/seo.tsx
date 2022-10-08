import { Helmet } from 'react-helmet';

type SeoProps = {
  title?: string;
};

export const Seo = ({ title = 'Code-BBBlog' }: SeoProps) => {
  return (
    <Helmet defaultTitle="Code-BBBlog" titleTemplate="Code-BBBlog | %s">
      <title>{title}</title>
      <meta name="title" content={title} />
    </Helmet>
  );
};
