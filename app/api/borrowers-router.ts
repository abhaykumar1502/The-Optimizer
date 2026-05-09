import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { borrowers } from "@db/schema";
import { eq, and, gte, lte, count, sql } from "drizzle-orm";

export const borrowersRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        segment: z.string().optional(),
        status: z.string().optional(),
        search: z.string().optional(),
        minRps: z.number().optional(),
        maxRps: z.number().optional(),
        minDpd: z.number().optional(),
        maxDpd: z.number().optional(),
        page: z.number().default(1),
        pageSize: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      const { segment, status, search, minRps, maxRps, minDpd, maxDpd, page, pageSize } = input;
      const offset = (page - 1) * pageSize;

      const conditions = [];
      if (segment) conditions.push(eq(borrowers.segment, segment as "sub_standard" | "doubtful" | "loss"));
      if (status) conditions.push(eq(borrowers.status, status as "active_ptp" | "follow_up" | "escalated" | "paid" | "no_contact"));
      if (minRps !== undefined) conditions.push(gte(borrowers.rpsScore, minRps));
      if (maxRps !== undefined) conditions.push(lte(borrowers.rpsScore, maxRps));
      if (minDpd !== undefined) conditions.push(gte(borrowers.dpd, minDpd));
      if (maxDpd !== undefined) conditions.push(lte(borrowers.dpd, maxDpd));
      if (search) {
        conditions.push(
          sql`${borrowers.name} LIKE ${`%${search}%`} OR ${borrowers.borrowerId} LIKE ${`%${search}%`}`
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const items = await db
        .select()
        .from(borrowers)
        .where(where)
        .limit(pageSize)
        .offset(offset);

      const totalResult = await db
        .select({ value: count() })
        .from(borrowers)
        .where(where);

      return {
        items,
        total: totalResult[0].value,
        page,
        pageSize,
      };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(borrowers)
        .where(eq(borrowers.id, input.id))
        .limit(1);
      return result[0] ?? null;
    }),

  getStats: publicQuery.query(async () => {
    const db = getDb();
    const totalResult = await db.select({ value: count() }).from(borrowers);
    const total = totalResult[0].value;

    const subStandardResult = await db
      .select({ value: count() })
      .from(borrowers)
      .where(eq(borrowers.segment, "sub_standard"));
    const doubtfulResult = await db
      .select({ value: count() })
      .from(borrowers)
      .where(eq(borrowers.segment, "doubtful"));
    const lossResult = await db
      .select({ value: count() })
      .from(borrowers)
      .where(eq(borrowers.segment, "loss"));

    return {
      total,
      bySegment: {
        sub_standard: subStandardResult[0].value,
        doubtful: doubtfulResult[0].value,
        loss: lossResult[0].value,
      },
    };
  }),
});
