import { Shell } from "@/components/ui/shell";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { IconAccount } from "@/components/icons/icon-account";
import { IconPlace } from "@/components/icons/icon-place";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <Shell custom="flex flex-col h-[500px] lg:h-screen justify-center lg:items-center p-2 lg:px-20">
      <div className="w-full lg:w-1/2 lg:h-[600px]">
        <div>
          <h1 className="font-calsans text-3xl">Dashboard</h1>
          <p>
            Welcome to dashboard{" "}
            <span className="font-bold">
              {user?.emailAddresses[0].emailAddress}
            </span>{" "}
            {/* add navigation to user later */}
            <Link className="underline" href="/users/12312312">
              Go to profile
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Link href="/dashboard/account">
            <div className="flex flex-col border p-4 rounded-md h-[8em] justify-between">
              <IconAccount />
              <h1 className="font-calsans mt-2">Manage Account</h1>
              <p className="text-muted text-sm">
                Provide your personal details.
              </p>
            </div>
          </Link>
          <Link href="/dashboard/account">
            <div className="flex flex-col border p-4 rounded-md h-[8em] justify-between">
              <IconPlace />
              <h1 className="font-calsans mt-2">Manage Places</h1>
              <p className="text-muted text-sm">
                Add, edit, delete your places.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Shell>
  );
}
