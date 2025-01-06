import { db } from "../src/server/db/index";
import { events } from "../src/server/db/schema";
import { eventsData } from "~/server/db/data/events";

async function seed() {
  console.log("Seeding database...");

  try {
    await db.delete(events);

    console.log("Database cleared.");

    for (const event of eventsData) {
      // Ensure `event` matches the expected `Event` structure
      await db.insert(events).values({
        name: event.name,
        date: event.date,
        time: event.time,
        venue: event.venue,
        city: event.city,
        country: event.country,
        image: event.images,
      });
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    process.exit(0); // Exit the script
  }
}

seed().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
