import fs from "fs";
import path from "path";

export const getFilePaths = (names: string[]) => {
  const dir = path.join(process.cwd(), "src", "app");
  const validFiles = fs.readdirSync(dir, { recursive: true }).filter((file) => {
    return names.includes(path.basename(file as string));
  }) as string[];

  const validPaths = validFiles.map((file) => {
    const pathWithoutPage = file
      .replace("page.mdx", "")
      .replace("page.tsx", "");
    // Remove any sets of parentheses from the path
    const pathWithoutTrailingSlash = pathWithoutPage.replace(/\/$/, "");
    const pathWithoutParentheses = pathWithoutTrailingSlash.replace(
      /\(.*?\)\//g,
      ""
    );
    return "/" + pathWithoutParentheses;
  });
  return validPaths;
};
