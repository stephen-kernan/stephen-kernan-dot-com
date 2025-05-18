import { ContentType } from "@/types/ContentType";
import styles from "./page.module.css";
import { PostList } from "@/components/molecules/PostList/PostList";

export default async function Home() {
  return (
    <div className={styles.landingPage}>
      <div className="main-content">
        <div className={styles.heroText}>
          <h1>Welcome ✌️</h1>
          <p>
            I&apos;m Stephen – a software engineer based in Saint Louis. This is
            my personal website, where I write about the things that interest
            me.
          </p>
          <p>
            For the most part, my writing is focused on technical and soft
            skills for software engineers. Occasionally, I may branch out and
            write about life, media, or hobbies.
          </p>
          <p>
            I write to gain clarity for myself and to help others grow. If you
            find value in my writing, that&apos;s wonderful. Either way,
            I&apos;m happy you&apos;re here.
          </p>
        </div>
        <div className={styles.recentPosts}>
          <PostList
            headingText="Recent posts"
            limit={3}
            contentTypes={[ContentType.Blog]}
          />
        </div>
      </div>
    </div>
  );
}
