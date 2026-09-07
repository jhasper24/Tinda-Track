import { defineRelations } from "drizzle-orm"
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    store: r.one.store(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  store: {
    owner: r.one.user({
      from: r.store.ownerId,
      to: r.user.id,
    }),
    products: r.many.product(),
  },
  product: {
    store: r.one.store({
      from: r.product.storeId,
      to: r.store.id,
    }),
  },
}))
