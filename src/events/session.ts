"use server";
import { cookies, headers } from "next/headers";

type SessionId = string;

interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

interface SessionData extends UTMData {
  ip: string;
  sessionId: SessionId;
  currentPath: string;
}

export const getSessionId = async (): Promise<SessionId | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("sessionID")?.value;
};

export const getCurrentPath = async (): Promise<string> => {
  const reqHeaders = await headers();
  return reqHeaders.get("x-current-path") ?? "";
};

export const getIP = async (): Promise<string> => {
  const fallback = "0.0.0.0";
  const pageHeaders = await headers();
  const forwardedFor = pageHeaders.get("x-forwarded-for");

  if (forwardedFor) {
    console.log("FORWARDED FOR => ", forwardedFor);
    return forwardedFor.split(",")[0] ?? fallback;
  }

  console.log("REAL IP FOR => ", forwardedFor);
  return pageHeaders.get("x-real-ip") ?? fallback;
};

export const getUTMData = async (): Promise<UTMData> => {
  const reqHeaders = await headers();
  return {
    utm_source: reqHeaders.get("x-utm-source") ?? "",
    utm_medium: reqHeaders.get("x-utm-medium") ?? "",
    utm_campaign: reqHeaders.get("x-utm-campaign") ?? "",
    utm_content: reqHeaders.get("x-utm-content") ?? "",
    utm_term: reqHeaders.get("x-utm-term") ?? "",
  };
};

export const getSessionInfo = async (): Promise<SessionData> => {
  const [sessionId, ip, currentPath, utmData] = await Promise.all([
    getSessionId(),
    getIP(),
    getCurrentPath(),
    getUTMData(),
  ]);

  const { utm_source, utm_medium, utm_campaign, utm_content, utm_term } =
    utmData;

  console.log("IP => ", ip);
  console.log("CURRENT PATH => ", currentPath);

  return {
    sessionId: sessionId as SessionId,
    ip,
    currentPath,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
  };
};
