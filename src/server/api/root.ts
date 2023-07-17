import { createTRPCRouter } from "./trpc";
import { helloRouter } from "./routers/hello";
import { productsRouter } from "./routers/products";
import { userRouter } from "./routers/user";

/**
 * merge all child routes into the "root" routes.
 * @see https://trpc.io/docs/server/merging-routers#merging-with-tmergerouters
 */

export const appRouter = createTRPCRouter({
  hello: helloRouter,
  products: productsRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
