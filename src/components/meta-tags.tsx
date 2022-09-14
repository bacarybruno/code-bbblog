import { Helmet } from "react-helmet";

type MetaTagsProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
  websiteUrl?: string;
};

export const MetaTags = ({
  title = "Code-BBBlog",
  websiteUrl = window.location.origin,
  description,
  imageUrl,
}: MetaTagsProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      {description && <meta name="description" content={description} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={websiteUrl} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={websiteUrl} />
      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}
      {imageUrl && <meta property="twitter:image" content={imageUrl} />}
    </Helmet>
  );
};
