import { initTRPC } from "@trpc/server";
import { prisma } from "../db";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";

/**
 * create a context for the entire procedures
 * best place to put things like session, database connection, etc.
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  return {
    prisma,
  };
};

/**
 * initialize trpc for backend server
 * pipe the context to initTRPC builder before calling create fn
 * NOTE: .context accepts generic <T>, which can be inferred from
 * a function return type or explicitly defined
 *
 * Example:
 * export type ContextReturnType = ReturnType<typeof createTRPCContext>;
 * -or-
 * .context<typeof createTRPCContext>
 * @see https://trpc.io/docs/server/context
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

/**
 * export reusable router
 * pattern:
 * root-route({ child-root-name: child-route, child-root-name: child-route })
 */
export const createTRPCRouter = t.router;

/**
 * suggested pattern for naming the procedure
 * @see https://trpc.io/docs/server/procedures
 */
export const publicProcedure = t.procedure;
