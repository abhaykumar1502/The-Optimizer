import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { kpiSnapshots } from "@db/schema";
import { desc } from "drizzle-orm";

export const kpiRouter = createRouter({
  getLatest: publicQuery.query(async () => {
    const db = getDb();
    const result = await db
      .select()
      .from(kpiSnapshots)
      .orderBy(desc(kpiSnapshots.snapshotDate))
      .limit(1);

    const latest = result[0];
    if (!latest) {
      return {
        collectionEfficiency: 96.8,
        totalCalls: 3500,
        ptpRate: 67.3,
        costSaved: 275000,
        avgCallDuration: 248,
        escalationRate: 7.5,
        aiResolutionRate: 82.0,
        accountsManaged: 1247,
      };
    }

    return {
      collectionEfficiency: parseFloat(latest.collectionEfficiency ?? "0"),
      totalCalls: latest.totalCalls ?? 0,
      ptpRate: parseFloat(latest.ptpRate ?? "0"),
      costSaved: parseFloat(latest.costSaved ?? "0"),
      avgCallDuration: latest.avgCallDuration ?? 0,
      escalationRate: parseFloat(latest.escalationRate ?? "0"),
      aiResolutionRate: parseFloat(latest.aiResolutionRate ?? "0"),
      accountsManaged: latest.accountsManaged ?? 0,
    };
  }),

  getTrend: publicQuery
    .input(z.object({ months: z.number().default(6) }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(kpiSnapshots)
        .orderBy(desc(kpiSnapshots.snapshotDate))
        .limit(input.months);

      return results.reverse().map((r) => ({
        date: r.snapshotDate ? String(r.snapshotDate) : "",
        collectionEfficiency: parseFloat(r.collectionEfficiency ?? "0"),
        totalCalls: r.totalCalls ?? 0,
        ptpRate: parseFloat(r.ptpRate ?? "0"),
        costSaved: parseFloat(r.costSaved ?? "0"),
      }));
    }),

  getAdoptionTrend: publicQuery.query(() => {
    return [
      { year: 2023, adoptionRate: 11 },
      { year: 2024, adoptionRate: 18 },
      { year: 2025, adoptionRate: 42 },
      { year: 2026, adoptionRate: 70 },
    ];
  }),
});
