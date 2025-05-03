import { FC, Fragment } from "react";
import styles from "./BlogPostList.module.css";

import { getBlogPosts } from "@/actions/getContent";
import { BlogFilter, BlogOrder } from "@/types/BlogFilter";
import { BlogPostPreview } from "@/components/atoms/BlogPostPreview/BlogPostPreview";
import ContentMetadata from "@/types/ContentMetadata";

interface BlogPostListProps {
  headingText?: string;
  filter?: BlogFilter;
  order?: BlogOrder;
  limit?: number;
  showExcerpt?: boolean;
}

// TODO: Implement pagination when I actually have enough content
export const BlogPostList: FC<BlogPostListProps> = ({
  headingText,
  filter,
  order,
  limit,
  showExcerpt = false,
}) => {
  const posts = getBlogPosts(filter, order, limit);
  const displayPosts = showExcerpt
    ? posts
    : posts.map((post) => ({ ...post, excerpt: "" }));

  return (
    <div className={styles.blogPostList}>
      {headingText && <h2>{headingText}</h2>}
      <div style={{ display: "flex", gap: "1rem", flexFlow: "column" }}>
        {displayPosts.map((post: ContentMetadata) => (
          <Fragment key={post.slug}>
            <BlogPostPreview {...post} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
