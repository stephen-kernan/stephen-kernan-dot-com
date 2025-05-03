import { ContentMetadata } from "@/types/ContentMetadata";
import { BlogFilter, BlogOrder } from "@/types/BlogFilter";
import fs from "fs";
import path from "path";

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

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir, { recursive: true }).filter((file) => {
    return path.extname(file as string) === ".mdx";
  });
}

const hrefFromFilepath = (filePath: string): string => {
  const pathSplit = filePath.split("app");
  if (pathSplit.length > 1) {
    return pathSplit[1].replace("/page.mdx", "");
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

export function getBlogPosts(
  filterFunc: BlogFilter = (c) => c,
  orderFunc: BlogOrder = (m1, m2) => (m1.date > m2.date ? -1 : 1),
  limit: number = 0
) {
  const allItems = getMDXData(path.join(process.cwd(), "src", "app", "blog"))
    .filter(filterFunc)
    .sort(orderFunc);

  if (limit) {
    return allItems.slice(0, limit);
  }

  return allItems;
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
