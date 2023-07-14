"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { api } from "@/lib/api";
import { useState, type PropsWithChildren } from "react";
import superjson from "superjson";
import { getBaseUrl } from "@/lib/api";

/**
 * create a TRPC client and wrap the application in tRPC Provider
 */

const TRPCProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  //hook below return a client created from api.createClient
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};

export default TRPCProvider;
