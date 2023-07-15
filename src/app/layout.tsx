import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TRPCProvider from "@/context/trpc-provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "spaceshop by hendrywilliam",
  description:
    "A simple spaceshop written in Typescript and a minimal adoption of tRPC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TRPCProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
