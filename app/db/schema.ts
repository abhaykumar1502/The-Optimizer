import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  decimal,
  date,
  bigint,
} from "drizzle-orm/mysql-core";

// ── Users (managed by Kimi OAuth) ──────────────────────────────────────
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── Borrowers ───────────────────────────────────────────────────────────
export const borrowers = mysqlTable("borrowers", {
  id: serial("id").primaryKey(),
  borrowerId: varchar("borrower_id", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  loanAmount: decimal("loan_amount", { precision: 12, scale: 2 }).notNull(),
  loanType: mysqlEnum("loan_type", ["personal", "home", "business", "auto", "education"]).default("personal"),
  dpd: int("dpd").default(0),
  rpsScore: int("rps_score").default(50),
  defaultReason: varchar("default_reason", { length: 255 }),
  status: mysqlEnum("status", ["active_ptp", "follow_up", "escalated", "paid", "no_contact"]).default("no_contact"),
  lastContact: timestamp("last_contact"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  pincode: varchar("pincode", { length: 10 }),
  loanTenure: int("loan_tenure"),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }),
  emiAmount: decimal("emi_amount", { precision: 10, scale: 2 }),
  segment: mysqlEnum("segment", ["sub_standard", "doubtful", "loss"]).default("sub_standard"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export type Borrower = typeof borrowers.$inferSelect;
export type InsertBorrower = typeof borrowers.$inferInsert;

// ── Calls ───────────────────────────────────────────────────────────────
export const calls = mysqlTable("calls", {
  id: serial("id").primaryKey(),
  callId: varchar("call_id", { length: 50 }).notNull().unique(),
  borrowerId: bigint("borrower_id", { mode: "number", unsigned: true }).notNull(),
  durationSeconds: int("duration_seconds").default(0),
  sentiment: mysqlEnum("sentiment", ["cooperative", "neutral", "distressed", "angry"]).default("neutral"),
  outcome: mysqlEnum("outcome", ["ptp", "paid", "escalated", "no_response", "callback_requested", "disconnected"]).default("no_response"),
  callTime: timestamp("call_time").defaultNow(),
  recordingUrl: varchar("recording_url", { length: 500 }),
  agentType: mysqlEnum("agent_type", ["ai", "human"]).default("ai"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Call = typeof calls.$inferSelect;
export type InsertCall = typeof calls.$inferInsert;

// ── Compliance Logs ─────────────────────────────────────────────────────
export const complianceLogs = mysqlTable("compliance_logs", {
  id: serial("id").primaryKey(),
  ruleName: varchar("rule_name", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["compliant", "violation", "warning"]).default("compliant"),
  checkedAt: timestamp("checked_at").defaultNow(),
  details: text("details"),
  severity: mysqlEnum("severity", ["critical", "warning", "info"]).default("info"),
  resolvedAt: timestamp("resolved_at"),
  resolutionNote: text("resolution_note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ComplianceLog = typeof complianceLogs.$inferSelect;
export type InsertComplianceLog = typeof complianceLogs.$inferInsert;

// ── KPI Snapshots ───────────────────────────────────────────────────────
export const kpiSnapshots = mysqlTable("kpi_snapshots", {
  id: serial("id").primaryKey(),
  snapshotDate: date("snapshot_date").notNull().unique(),
  collectionEfficiency: decimal("collection_efficiency", { precision: 5, scale: 2 }).default("0"),
  totalCalls: int("total_calls").default(0),
  ptpRate: decimal("ptp_rate", { precision: 5, scale: 2 }).default("0"),
  costSaved: decimal("cost_saved", { precision: 12, scale: 2 }).default("0"),
  avgCallDuration: int("avg_call_duration").default(0),
  escalationRate: decimal("escalation_rate", { precision: 5, scale: 2 }).default("0"),
  aiResolutionRate: decimal("ai_resolution_rate", { precision: 5, scale: 2 }).default("0"),
  accountsManaged: int("accounts_managed").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export type KpiSnapshot = typeof kpiSnapshots.$inferSelect;
export type InsertKpiSnapshot = typeof kpiSnapshots.$inferInsert;
