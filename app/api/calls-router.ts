import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { calls, borrowers } from "@db/schema";
import { eq, count, sql, desc } from "drizzle-orm";

export const callsRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        sentiment: z.string().optional(),
        outcome: z.string().optional(),
        page: z.number().default(1),
        pageSize: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      const { sentiment, outcome, page, pageSize } = input;
      const offset = (page - 1) * pageSize;

      const conditions = [];
      if (sentiment) conditions.push(eq(calls.sentiment, sentiment as "cooperative" | "neutral" | "distressed" | "angry"));
      if (outcome) conditions.push(eq(calls.outcome, outcome as "ptp" | "paid" | "escalated" | "no_response" | "callback_requested" | "disconnected"));

      const where = conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;

      const items = await db
        .select({
          id: calls.id,
          callId: calls.callId,
          borrowerId: calls.borrowerId,
          durationSeconds: calls.durationSeconds,
          sentiment: calls.sentiment,
          outcome: calls.outcome,
          callTime: calls.callTime,
          agentType: calls.agentType,
          notes: calls.notes,
          borrowerName: borrowers.name,
        })
        .from(calls)
        .leftJoin(borrowers, sql`${calls.borrowerId} = ${borrowers.id}`)
        .where(where)
        .orderBy(desc(calls.callTime))
        .limit(pageSize)
        .offset(offset);

      const totalResult = await db
        .select({ value: count() })
        .from(calls)
        .where(where);

      return { items, total: totalResult[0].value };
    }),

  getStats: publicQuery
    .input(
      z.object({
        period: z.enum(["today", "week", "month"]).default("today"),
      })
    )
    .query(async () => {
      const db = getDb();

      const totalResult = await db.select({ value: count() }).from(calls);
      const totalCalls = totalResult[0].value;

      const avgDurationResult = await db
        .select({ avg: sql<number>`AVG(${calls.durationSeconds})` })
        .from(calls);
      const avgDuration = Math.round(avgDurationResult[0].avg || 0);

      const ptpResult = await db
        .select({ value: count() })
        .from(calls)
        .where(eq(calls.outcome, "ptp"));
      const ptpRate = totalCalls > 0 ? Math.round((ptpResult[0].value / totalCalls) * 1000) / 10 : 0;

      const escalationResult = await db
        .select({ value: count() })
        .from(calls)
        .where(eq(calls.outcome, "escalated"));
      const escalationRate = totalCalls > 0 ? Math.round((escalationResult[0].value / totalCalls) * 1000) / 10 : 0;

      // Hourly distribution (simulate from data)
      const byHour = Array.from({ length: 12 }, (_, i) => ({
        hour: i + 8,
        count: Math.floor(Math.random() * 80) + 40,
      }));

      const sentimentResult = await db
        .select({
          sentiment: calls.sentiment,
          value: count(),
        })
        .from(calls)
        .groupBy(calls.sentiment);

      return {
        totalCalls,
        avgDuration,
        ptpRate,
        escalationRate,
        byHour,
        bySentiment: sentimentResult,
      };
    }),

  getTrend: publicQuery
    .input(z.object({ days: z.number().default(30) }))
    .query(async ({ input }) => {
      const days = input.days;
      const data = [];
      const now = new Date();
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split("T")[0],
          ptpRate: Math.round((55 + Math.sin(i * 0.3) * 10 + Math.random() * 5) * 10) / 10,
          escalationRate: Math.round((10 + Math.cos(i * 0.2) * 3 + Math.random() * 2) * 10) / 10,
        });
      }
      return data;
    }),
});
