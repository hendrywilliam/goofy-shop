import * as React from "react";
import type { ResolvingMetadata, Metadata } from "next";
import { getHostProfile } from "@/app/_actions/user";
import { Avatar } from "@/components/ui/avatar";
import { Shell } from "@/components/ui/shell";

interface PageProps {
  params: { user: string };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Host Profile - Spaceshop`,
    description: `Host profile, location, description, etc.`,
    keywords: [
      "Next.js",
      "React",
      "Typescript",
      "Freya",
      "Nashifa",
      "Jayawardana",
    ],
    authors: [{ name: "yrdneh", url: "https://www.instagram.com/jkt48.freya" }],
    creator: "Freyanashifa Jayawardana",
    applicationName: "spaceshop",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
  };
}

export default async function UserPage({
  params,
}: {
  params: {
    user: string;
  };
}) {
  const user = await getHostProfile(params.user);

  return (
    <Shell custom="flex flex-col h-max lg:h-screen p-2 lg:px-20 items-center">
      <div className="flex flex-col w-full lg:w-1/2 mt-24">
        <h1 className="text-3xl font-bold">Host Profile</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <section className="lg:basis-1/2 gap-2">
            <Avatar
              custom="w-24 h-24 mt-2"
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}'s avatar`}
            />
            <div id="host-name" className="mt-2">
              <p className="text-muted">Full Name</p>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div id="host-description" className="mt-2">
              <p className="text-muted">Description</p>
              <p>
                {user.description.length > 0
                  ? user.description
                  : "Host hasn't updated their description yet."}
              </p>
            </div>
          </section>
          <section className="flex flex-col lg:basis-1/2 gap-2">
            <div>
              <p className="text-muted">Host Review(s)</p>
              <div
                id="host-reviews"
                className="min-h-[200px] border rounded-md"
              ></div>
            </div>
            <div>
              <p className="text-muted">Host Listing(s)</p>
              <div
                id="host-listing"
                className="min-h-[200px] border rounded-md"
              ></div>
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
}
