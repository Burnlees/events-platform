import { asc, desc } from "drizzle-orm";
import { events } from "~/server/db/schema";

export const getOrderByClause = (
  sortBy: string | undefined,
  orderBy: string | undefined,
) => {
  let sortByColumn;

  switch (sortBy) {
    case "name":
      sortByColumn = events.name;
      break;
    case "date":
      sortByColumn = events.date;
      break;
    case "venue":
      sortByColumn = events.venue;
      break;
    case "city":
      sortByColumn = events.city;
      break;
    default:
      sortByColumn = events.id;
  }

  if (!orderBy || orderBy === "asc") {
    return asc(sortByColumn);
  } else {
    return desc(sortByColumn);
  }
};
