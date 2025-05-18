"use server";
import { AnalyticsClient } from "@/events/AnalyticsClient";
import { EventName } from "@/events/types";
import { getSessionInfo } from "@/events/session";
import fs from "fs";
import path from "path";

const ENVIRONMENT = process.env.NODE_ENV;

// This is a server action which can be called by Client components.
// It sends an event to the analytics provider from the server, therefby
// bypassing any client-side blockers.

const pagePrefixes = ["/blog", "/notes", "/about"];

export const sendEvent = async (
  name: EventName,
  properties: Record<string, string>
) => {
  const client = new AnalyticsClient();
  const { sessionId, currentPath, ...sessionInfo } = await getSessionInfo();

  const dir = path.join(process.cwd(), "src", "app");
  const validFiles = fs.readdirSync(dir, { recursive: true }).filter((file) => {
    return (
      path.basename(file as string) === "page.mdx" ||
      path.basename(file as string) === "page.tsx"
    );
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

  console.log("Valid files: ", validPaths);

  // Only track the home page and actual pages
  let shouldTrack = currentPath === "/";
  for (const prefix of pagePrefixes) {
    if (currentPath.startsWith(prefix)) {
      shouldTrack = true;
      break;
    }
  }

  // Don't track any paths with a dot in them, as these are likely
  // to be static assets or API routes.
  if (currentPath.includes(".")) {
    shouldTrack = false;
  }

  if (!shouldTrack) {
    return;
  }

  client.track({
    name: name,
    properties: {
      distinct_id: sessionId,
      environment: ENVIRONMENT,
      path: currentPath,
      ...sessionInfo,
      ...properties,
    },
  });
};
