import { FC, ReactNode } from "react";

interface BlogPostHeadingProps {
  children: ReactNode;
}

export const BlogPostHeading: FC<BlogPostHeadingProps> = ({ children }) => {
  return <h1 className="transition-heading">{children}</h1>;
};
