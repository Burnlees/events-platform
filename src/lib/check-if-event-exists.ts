import type { OAuth2Client } from "google-auth-library";
import type { calendar_v3 } from "googleapis/build/src/apis/calendar/v3";

export const checkIfEventExists = async (
  eventId: number,
  calendar: calendar_v3.Calendar,
  auth: OAuth2Client,
) => {
  const events = await calendar.events.list({
    auth,
    calendarId: "primary",
  });

  return events.data.items?.some((event) =>
    event.id?.includes(`nuid${eventId}`),
  );
};
