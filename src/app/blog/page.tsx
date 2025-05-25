import { PostList } from "@/components/molecules/PostList/PostList";
import { ContentType } from "@/types/ContentType";

export default async function BlogHome() {
  return (
    <div>
      <h1>Blog</h1>
      <p>
        A collection of articles and essays I&apos;ve written. They are longer
        and more polished than notes.
      </p>
      <PostList contentTypes={[ContentType.Blog]} />
    </div>
  );
}
