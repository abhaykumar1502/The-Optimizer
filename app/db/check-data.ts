import { getDb } from "../api/queries/connection";
import { borrowers, calls, kpiSnapshots, complianceLogs } from "./schema";
import { count } from "drizzle-orm";

const db = getDb();

async function check() {
  const bCount = await db.select({ value: count() }).from(borrowers);
  const cCount = await db.select({ value: count() }).from(calls);
  const kCount = await db.select({ value: count() }).from(kpiSnapshots);
  const clCount = await db.select({ value: count() }).from(complianceLogs);

  console.log(`Borrowers: ${bCount[0].value}`);
  console.log(`Calls: ${cCount[0].value}`);
  console.log(`KPI Snapshots: ${kCount[0].value}`);
  console.log(`Compliance Logs: ${clCount[0].value}`);
}

check().catch(console.error);
