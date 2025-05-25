import { slugifyTitle } from "@/actions/slugifyTitle";
import { EasyImage } from "@/components/EasyImage/EasyImage";
import { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";

const components: MDXComponents = {
  h1: ({ children, ...props }: ComponentPropsWithoutRef<"h1">) => {
    const titleSlug = slugifyTitle(children as string);
    return (
      <h1 style={{ viewTransitionName: `post-title-${titleSlug}` }} {...props}>
        {children}
      </h1>
    );
  },
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => {
    return <p {...props}>{children}</p>;
  },
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => {
    return <ul {...props}>{children}</ul>;
  },
  img: ({ ...props }: ComponentPropsWithoutRef<"img">) => {
    return <EasyImage url={props.src as string} />;
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    if (props.className?.includes("language-mermaid")) {
      return (
        <pre {...props} className="mermaid mermaid-pending">
          {children}
        </pre>
      );
    }

    if (props.className?.includes("language-plaintext")) {
      return <code>{children}</code>;
    }
    const highlightedContent = highlight(children as string, {});
    return (
      <code
        dangerouslySetInnerHTML={{ __html: highlightedContent.toString() }}
        {...props}
      />
    );
  },
};

export function useMDXComponents(
  otherComponents: MDXComponents
): MDXComponents {
  return {
    ...otherComponents,
    ...components,
  };
}
