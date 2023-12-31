import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TRPCProvider from "@/context/trpc-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Toaster from "@/components/ui/toaster";
import localFont from "next/font/local";

const calsans = localFont({
  src: "../assets/fonts/calsans-semibold.woff2",
  display: "swap",
  variable: "--font-calsans",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spaceshop",
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
          <body
            className={`${inter.className} ${calsans.variable} antialiased font-medium`}
          >
            {children}
            <Toaster position="top-center" />
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
