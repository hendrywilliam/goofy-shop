import { createTRPCRouter } from "./trpc";
import { spaceRouter } from "./routers/space";
import { amenityRouter } from "./routers/amenity";
import { reviewRouter } from "./routers/review";
import { cityRouter } from "./routers/city";
import { helloRouter } from "./routers/hello";

/**
 * merge all child routes into the "root" routes.
 * @see https://trpc.io/docs/server/merging-routers#merging-with-tmergerouters
 */

export const appRouter = createTRPCRouter({
  space: spaceRouter,
  amenity: amenityRouter,
  review: reviewRouter,
  city: cityRouter,
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
