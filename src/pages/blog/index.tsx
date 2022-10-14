import readingTime from 'reading-time';
import { SvgIcon } from '../../components';
import { BlogPostItem, usePosts } from '../../hooks/use-posts';
import * as SC from './styles';

const BlogPage = () => {
  const { data, isLoading } = usePosts();

  if (isLoading) return null;
  if (!data) return null;

  const renderPost = (post: BlogPostItem) => {
    const publishedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
    }).format(new Date(post.sys.publishedAt));

    const readTime = `${readingTime(post.body).minutes} min read`;

    return (
      <SC.Article key={post.sys.id}>
        <header>
          <SC.Link href={`/posts/${post.slug}`}>
            <SvgIcon name={post.icon} title={post.title} size="medium" />
            {post.title}
          </SC.Link>
        </header>
        <span>{`Bruno Bodian / ${publishedAt} • ${readTime}`}</span>
        <SC.Excerpt>{post.excerpt}</SC.Excerpt>
      </SC.Article>
    );
  };

  return <>{data.map(renderPost)}</>;
};

export default BlogPage;
