import ContentMetadata from "@/types/ContentMetadata";
import { FC } from "react";

import styles from "./PostPreview.module.css";
import { Button } from "../Button/Button";
import { slugifyTitle } from "@/actions/slugifyTitle";
import Link from "next/link";
import { formatDate } from "@/actions/formatDate";

interface TagListProps {
  tags: string[];
}

export const TagList: FC<TagListProps> = ({ tags }) => {
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

export const PostPreview: FC<ContentMetadata> = ({
  title,
  date,
  url,
  excerpt,
  tags,
}) => {
  const formattedDate = formatDate(date);
  const isNote = url.includes("/notes/");

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
          {isNote && <TagList tags={tags} />}
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
