import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const requestCookies = req.cookies;
  const requestHeaders = new Headers(req.headers);

  // Add the current path and referrer so that the Analytics helpers can pull it.
  const pathname = req.nextUrl.pathname ?? req.url.split("/")[3];
  requestHeaders.set("x-current-path", pathname);
  requestHeaders.set("x-referred-by", req.referrer || "/");

  // Add UTM data to the request headers
  requestHeaders.set(
    "x-utm-source",
    req.nextUrl.searchParams.get("utm_source") || ""
  );
  requestHeaders.set(
    "x-utm-medium",
    req.nextUrl.searchParams.get("utm_medium") || ""
  );
  requestHeaders.set(
    "x-utm-campaign",
    req.nextUrl.searchParams.get("utm_campaign") || ""
  );
  requestHeaders.set(
    "x-utm-content",
    req.nextUrl.searchParams.get("utm_content") || ""
  );
  requestHeaders.set(
    "x-utm-term",
    req.nextUrl.searchParams.get("utm_term") || ""
  );

  // Create a session ID if one doesn't exist
  let sessionID = requestCookies.get("sessionID")?.value ?? "";
  if (!sessionID) {
    sessionID = crypto.randomUUID();
    requestCookies.set("sessionID", sessionID);
  }

  const response = NextResponse.next({
    headers: requestHeaders,
  });

  // This step sets the cookies in the browser because
  // Next.js passes cookies in a Set-Cookie header.
  response.cookies.set({
    name: "sessionID",
    value: sessionID,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon).*)"],
};
