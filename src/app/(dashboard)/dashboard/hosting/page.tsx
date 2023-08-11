import { Shell } from "@/components/ui/shell";
import { getOwnedSpaces } from "@/app/_actions/space";
import SpaceTableShell from "@/components/shells/space-table-shell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Hosting",
  description:
    "Manage your hosting, edit or delete spaces all spaces are under your control.",
  applicationName: "spaceshop",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "Typescript", "Fureya"],
  authors: [{ name: "yrdneh", url: "https://www.instagram.com/jkt48.freya" }],
  creator: "yrdneh",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default async function DashboardHostingPage() {
  const ownedSpaces = await getOwnedSpaces();

  return (
    <Shell custom="min-h-screen h-[700px]">
      <SpaceTableShell data={ownedSpaces} />
    </Shell>
  );
}
