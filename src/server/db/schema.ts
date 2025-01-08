import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `events-platform_${name}`);

export const events = createTable(
  "event",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    date: varchar("date", { length: 256 }).notNull(),
    time: varchar("time", { length: 256 }).notNull(),
    venue: varchar("venue", { length: 256 }).notNull(),
    city: varchar("city", { length: 256 }).notNull(),
    country: varchar("country", { length: 256 }).notNull(),
    image: varchar("image", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = createTable(
  "user",
  {
    id: varchar("id").primaryKey().unique().notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    username: varchar("username", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    emailIndex: index("email_idx").on(example.email),
  }),
);

export const registrations = createTable(
  "registration",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    eventId: integer("event_id")
      .references(() => events.id)
      .notNull(),
    userId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (example) => ({
    eventIdIndex: index("event_id_idx").on(example.eventId),
    userIdIndex: index("user_id_idx").on(example.userId),
    unq: unique().on(example.eventId, example.userId),
  }),
);
