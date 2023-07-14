import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

/**
 * This is how to server tRPC router into Next.js project.
 * simply create API handle in @/pages/api/trpc/[trpc].ts
 *
 * @see https://trpc.io/docs/server/adapters/nextjs#nextjs-example
 */

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
