import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `annuaire-jeunesse-carantec_${name}`);

export const contact = createTable(
  "contact",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    photo: varchar("phto", { length: 256 }),
    nom: varchar("nom", { length: 256 })
      .notNull(),
    prenom: varchar("prenom", { length: 256 })
      .notNull(),
    isActive: boolean("is_active")
      .default(true),
    dateNotActive: timestamp("date_not_active", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    mail: varchar("mail", { length: 256 }),
    mobile: varchar("mobile", { length: 256 }),
    fixe: varchar("fixe", { length: 256 }),
    fonction: varchar("fonction", { length: 256 }),
    adresse: varchar("adresse", { length: 256 }),
  }
);


export const structure = createTable(
  "structure",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    photo: varchar("phto", { length: 256 }),
    ville: varchar("ville", { length: 256 })
      .notNull(),
    nom: varchar("nom", { length: 256 })
      .notNull(),
    rangeAge: varchar("range_age", { length: 256 }),
    isActive: boolean("is_active")
      .default(true),
    dateNotActive: timestamp("date_not_active", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    description: varchar("description", { length: 256 }),
    mail: varchar("mail", { length: 256 }),
    telephone: varchar("telephone", { length: 256 }),
    adresse: varchar("adresse", { length: 256 }),
  }
);

export const activite = createTable(
  "activite",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    nom: varchar("nom", { length: 256 })
      .notNull(),
    logo: varchar("logo", { length: 256 }),
    activite: varchar("activite", { length: 256 }),
    ville: varchar("ville", { length: 256 })
      .notNull(),
    domaine: varchar("domaine", { length: 256 }),
    site: varchar("site", { length: 256 }),
    mail: varchar("mail", { length: 256 }),
    telephone: varchar("telephone", { length: 256 }),
    commentaire: varchar("commentaire", { length: 256 }),
    adresse: varchar("adresse", { length: 256 }),
  }
);

export const partenaire = createTable(
  "partenaire",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    logo: varchar("logo", { length: 256 }),
    nom: varchar("nom", { length: 256 })
      .notNull(),
    nomDetails: varchar("nom_details", { length: 256 }),
    contact: varchar("contact", { length: 256 }),
    mail: varchar("mail", { length: 256 }),
    telephone: varchar("telephone", { length: 256 }),
    isActive: boolean("is_active")
      .default(true),
    dateNotActive: timestamp("date_not_active", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    site: varchar("site", { length: 256 }),
    champsAction: varchar("champs_action", { length: 256 }),
    adresse: varchar("adresse", { length: 256 }),
  }
);

export const appartient = createTable(
  "appartient",
  {
    contactId: varchar("contact_id", { length: 255 })
      .notNull()
      .references(() => contact.id),
    structureId: varchar("structure_id", { length: 255 })
      .notNull()
      .references(() => contact.id),
    isRespo: boolean("is_respo").default(false),
  }, (table) => ({
    pk: primaryKey(table.contactId, table.structureId)
  }));

export const contactRelations = relations(contact, ({ many }) => ({
  appartient: many(appartient),
}));

export const structureRelations = relations(structure, ({ many }) => ({
  appartient: many(appartient),
}));

export const appartientRelations = relations(appartient, ({ one }) => ({
  contact: one(contact, {
    fields: [appartient.contactId],
    references: [contact.id]
  }),
  structure: one(structure, {
    fields: [appartient.structureId],
    references: [structure.id]
  }),
}));

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
