import { initTRPC, TRPCError } from "@trpc/server";
import { prisma } from "../db";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import {
  type SignedInAuthObject,
  SignedOutAuthObject,
  getAuth,
} from "@clerk/nextjs/server";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

/**
 * innerContext for auth
 */

export const createContextInner = async ({ auth }: AuthContext) => {
  return {
    auth,
  };
};

/**
 * create a context for the entire procedures
 * best place to put things like session, database connection, etc.
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { auth } = await createContextInner({ auth: getAuth(opts.req) });
  return {
    auth,
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

/**
 * publicProcedure.use(middleware(opts))
 *  _______"opts"____
 *  |               |
 * .use(middleware(opts))
 * .use function will populate "opts" automatically
 */

export const middleware = t.middleware;

const isAuthenticated = middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized, please log in before proceed.",
    });
  }
  return opts.next({
    ctx: {
      auth: opts.ctx.auth,
      prisma,
    },
  });
});

/**
 * protected procedure, its accessable only for user who logged in.
 * it uses authMiddleware which we defined at the top of it
 */
export const protectedProcedure = publicProcedure.use(isAuthenticated);
