import { createTRPCRouter } from "./trpc";
import { spaceRouter } from "./routers/space";
import { amenityRouter } from "./routers/amenity";
import { reviewRouters } from "./routers/review";

/**
 * merge all child routes into the "root" routes.
 * @see https://trpc.io/docs/server/merging-routers#merging-with-tmergerouters
 */

export const appRouter = createTRPCRouter({
  space: spaceRouter,
  amenity: amenityRouter,
  review: reviewRouters,
});

export type AppRouter = typeof appRouter;
