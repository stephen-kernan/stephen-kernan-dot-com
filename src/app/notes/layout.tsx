import { ReactNode } from "react";

export default async function NotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="split-page">
      <div className="blog-post main-content">{children}</div>
    </div>
  );
}
