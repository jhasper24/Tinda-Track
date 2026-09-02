import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { user } from "./auth-schema"

export const store = pgTable("store", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: text("ownerId")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})
