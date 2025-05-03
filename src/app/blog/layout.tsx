import { ReactNode } from "react";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="split-page blog-post">
      <div>{children}</div>
    </div>
  );
}
