import { BlogPostList } from "@/components/molecules/BlogPostList/BlogPostList";

export default async function BlogHome() {
  return (
    <div>
      <h1>Blog</h1>
      <BlogPostList />
    </div>
  );
}
