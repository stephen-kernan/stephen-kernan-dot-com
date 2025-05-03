"use server";
import { AnalyticsClient } from "@/events/AnalyticsClient";
import { EventName } from "@/events/types";
import { getSessionInfo } from "@/events/session";

const ENVIRONMENT = process.env.NODE_ENV;

// This is a server action which can be called by Client components.
// It sends an event to the analytics provider from the server, therefby
// bypassing any client-side blockers.

export const sendEvent = async (
  name: EventName,
  properties: Record<string, string>
) => {
  const client = new AnalyticsClient();
  const { sessionId, currentPath, ...sessionInfo } = await getSessionInfo();

  client.track({
    name: name,
    properties: {
      distinct_id: sessionId,
      environment: ENVIRONMENT,
      path: currentPath,
      currentPath: currentPath,
      ...sessionInfo,
      ...properties,
    },
  });
};
