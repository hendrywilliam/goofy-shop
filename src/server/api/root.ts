import { createTRPCRouter } from "./trpc";
import { spaceRouter } from "./routers/space";

/**
 * merge all child routes into the "root" routes.
 * @see https://trpc.io/docs/server/merging-routers#merging-with-tmergerouters
 */

export const appRouter = createTRPCRouter({
  space: spaceRouter,
});

export type AppRouter = typeof appRouter;
