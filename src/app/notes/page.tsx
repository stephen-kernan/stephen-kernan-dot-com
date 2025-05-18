import { PostList } from "@/components/molecules/PostList/PostList";
import { ContentType } from "@/types/ContentType";

export default async function NotesHome() {
  return (
    <div>
      <h1>Notes</h1>
      <p>Tiny blocks of knowledge that stand on their own – like flashcards.</p>
      <PostList contentTypes={[ContentType.Note]} />
    </div>
  );
}
