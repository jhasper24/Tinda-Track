import { numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { store } from "./store"

export const markupTypeEnum = pgEnum("markupType", ["percent", "fixed"])

export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  storeId: uuid("storeId")
    .notNull()
    .references(() => store.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  cost: numeric("cost", { precision: 10, scale: 2 }).notNull(),
  markupType: markupTypeEnum("markupType").notNull(),
  markupValue: numeric("markupValue", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export type Product = typeof product.$inferSelect
