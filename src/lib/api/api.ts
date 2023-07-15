import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/api/root";

export const getBaseUrl = () => {
  //browser should use relative path
  if (typeof window !== "undefined") return "";

  //reference for vercel.com
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  //this for localhost development
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

/**
 * this will create tRPC Hooks for strongly-typed hooks from API's type signature
 *
 * @see https://trpc.io/docs/client/react/setup
 * NOTE: tRPC + Next13 is on experimental
 * @see https://github.com/trpc/trpc/discussions/3185
 */

/**
 * Create a set of strongly-typed React hooks from appRoute type signature.
 * appRouter comes from @/server/api/root.ts
 */
export const api = createTRPCReact<AppRouter>();
