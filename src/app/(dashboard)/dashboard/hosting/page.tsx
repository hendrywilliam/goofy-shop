import { Shell } from "@/components/ui/shell";
import { getOwnedSpaces } from "@/app/_actions/space";
import SpaceTableShell from "@/components/shells/space-table-shell";
import { truncate } from "@/lib/utils";

export default async function DashboardHostingPage() {
  const ownedSpaces = await getOwnedSpaces();

  return (
    <Shell custom="min-h-screen h-[700px]">
      <SpaceTableShell data={ownedSpaces} />
    </Shell>
  );
}
