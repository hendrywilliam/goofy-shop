import { createTRPCRouter } from "./trpc";
import { helloRouter } from "./routers/hello";
// import { productsRouter } from "./routers/products";

export const appRouter = createTRPCRouter({
  hello: helloRouter,
  // productsRouter: productsRouter,
});

export type AppRouter = typeof appRouter;
