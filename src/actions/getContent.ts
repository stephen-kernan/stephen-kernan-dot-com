import { ContentMetadata } from "@/types/ContentMetadata";
import { BlogFilter, BlogOrder } from "@/types/BlogFilter";
import fs from "fs";
import path from "path";
import { ContentType } from "@/types/ContentType";

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /metadata = {\s*([\s\S]*?)\s*}/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match || match.length === 0) {
    return {};
  }
  const frontMatterBlock = `{${match![1]}}`;

  try {
    const metadata = new Function(`return ${frontMatterBlock}`)();
    return { metadata: metadata as ContentMetadata };
  } catch (e) {
    console.error("Failed to parse metadata: ", e);
    return {};
  }
}

export function getMDXFiles(dir: string) {
  return fs.readdirSync(dir, { recursive: true }).filter((file) => {
    return path.basename(file as string) === "page.mdx";
  });
}

const hrefFromFilepath = (filePath: string): string => {
  const pathSplit = filePath.split("app");
  if (pathSplit.length > 1) {
    const path = pathSplit[1].replace("/page.mdx", "");
    // Remove any sets of parentheses from the path'
    const pathWithoutParentheses = path.replace(/\(.*?\)\//g, "");
    return pathWithoutParentheses;
  }
  return "/";
};

function readMDXFile(filePath: string): ContentMetadata {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsedContent = parseFrontmatter(rawContent);

  return {
    ...(parsedContent.metadata as ContentMetadata),
    url: hrefFromFilepath(filePath),
  };
}

function getMDXData(dir: string): ContentMetadata[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => readMDXFile(path.join(dir, file as string)));
}

const pathsMap: Record<ContentType, string> = {
  [ContentType.Blog]: path.join(process.cwd(), "src", "app", "blog"),
  [ContentType.BlogPersonal]: path.join(
    process.cwd(),
    "src",
    "app",
    "blog",
    "(personal)"
  ),
  [ContentType.BlogProfessional]: path.join(
    process.cwd(),
    "src",
    "app",
    "blog",
    "(professional)"
  ),
  [ContentType.Note]: path.join(process.cwd(), "src", "app", "notes"),
  [ContentType.All]: "", // Left blank because 'All' is a combination of all paths
};

export const getPosts = (
  contentTypes: ContentType[] = [ContentType.All],
  filterFunc: BlogFilter = (c) => c,
  orderFunc: BlogOrder = (m1, m2) => (m1.date > m2.date ? -1 : 1),
  limit: number = 0
): ContentMetadata[] => {
  const paths: string[] = [];
  contentTypes.forEach((type) => {
    if (type === ContentType.All) {
      Object.values(pathsMap).forEach((path) => {
        if (path !== pathsMap[ContentType.All]) {
          paths.push(path);
        }
      });
    } else {
      paths.push(pathsMap[type]);
    }
  });

  // Get all the items from the paths stitched together
  // Don't order or limit yet to avoid losing data
  const items: ContentMetadata[] = [];
  paths.forEach((path) => {
    const mdxData = getMDXData(path).filter(filterFunc);
    items.push(...mdxData);
  });

  // Remove duplicates based on the slug. This is required because
  // some categories have some overlap (e.g., all blog posts + personal blog posts)
  const uniqueItems = new Map<string, ContentMetadata>();
  items.forEach((item) => {
    if (!uniqueItems.has(item.slug)) {
      uniqueItems.set(item.slug, item);
    }
  });

  // Sort the full list of items
  const sortedItems = new Array(...uniqueItems.values()).sort(orderFunc);

  return sortedItems.slice(0, limit === 0 ? sortedItems.length : limit);
};
