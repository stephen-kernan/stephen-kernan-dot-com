import { FC, ReactNode } from "react";

interface BlogPostHeadingProps {
  children: ReactNode;
}

export const PostHeading: FC<BlogPostHeadingProps> = ({ children }) => {
  return <h1 className="transition-heading">{children}</h1>;
};
