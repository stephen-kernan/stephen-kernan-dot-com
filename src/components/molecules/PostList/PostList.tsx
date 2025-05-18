import { FC, Fragment } from "react";
import styles from "./PostList.module.css";

import { getPosts } from "@/actions/getContent";
import { BlogFilter, BlogOrder } from "@/types/BlogFilter";
import { PostPreview } from "@/components/atoms/PostPreview/PostPreview";
import ContentMetadata from "@/types/ContentMetadata";
import { ContentType } from "@/types/ContentType";

interface PostListProps {
  headingText?: string;
  filter?: BlogFilter;
  order?: BlogOrder;
  limit?: number;
  showExcerpt?: boolean;
  contentTypes?: ContentType[];
}

// TODO: Implement pagination when I actually have enough content
export const PostList: FC<PostListProps> = ({
  contentTypes: postTypes = [ContentType.All],
  headingText,
  filter,
  order,
  limit,
  showExcerpt = false,
}) => {
  const posts = getPosts(postTypes, filter, order, limit);
  const displayPosts = showExcerpt
    ? posts
    : posts.map((post) => ({ ...post, excerpt: "" }));

  return (
    <div className={styles.blogPostList}>
      {headingText && <h2>{headingText}</h2>}
      <div style={{ display: "flex", gap: "1rem", flexFlow: "column" }}>
        {displayPosts.map((post: ContentMetadata) => (
          <Fragment key={post.slug}>
            <PostPreview {...post} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
