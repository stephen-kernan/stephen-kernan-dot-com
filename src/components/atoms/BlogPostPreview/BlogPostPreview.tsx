import ContentMetadata from "@/types/ContentMetadata";
import { FC } from "react";

import styles from "./BlogPostPreview.module.css";
import { Button } from "../Button/Button";
import { slugifyTitle } from "@/actions/slugifyTitle";
import Link from "next/link";
import { formatDate } from "@/actions/formatDate";

interface BlogTagListProps {
  tags: string[];
}

export const BlogTagList: FC<BlogTagListProps> = ({ tags }) => {
  return (
    <div className={styles.tagList}>
      {tags.map((tag) => (
        <div key={tag} className={styles.tag}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export const BlogPostPreview: FC<ContentMetadata> = ({
  title,
  date,
  url,
  excerpt,
}) => {
  const formattedDate = formatDate(date);

  return (
    <div className={styles.previewSection}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={styles.metadata}>
          <Link href={url}>
            <h3
              style={{
                viewTransitionName: `post-title-${slugifyTitle(title)}`,
              }}
            >
              {title}
            </h3>
          </Link>
          <p
            className={`muted-text ${styles.publishedDate}`}
            style={{ viewTransitionName: `date-${slugifyTitle(title)}` }}
          >
            {formattedDate}
          </p>
        </div>
        <div className={styles.buttonDesktop}>
          <Button href={url}>--{">"}</Button>
        </div>
      </div>
      {excerpt && (
        <div className={styles.excerpt}>
          <p>{excerpt}</p>
        </div>
      )}
      <div className={styles.buttonMobile}>
        <Button href={url}>--{">"}</Button>
      </div>
    </div>
  );
};
