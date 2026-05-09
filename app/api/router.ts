import { authRouter } from "./auth-router";
import { borrowersRouter } from "./borrowers-router";
import { callsRouter } from "./calls-router";
import { complianceRouter } from "./compliance-router";
import { kpiRouter } from "./kpi-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  borrowers: borrowersRouter,
  calls: callsRouter,
  compliance: complianceRouter,
  kpi: kpiRouter,
});

export type AppRouter = typeof appRouter;
