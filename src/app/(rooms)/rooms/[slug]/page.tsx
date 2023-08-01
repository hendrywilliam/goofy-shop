import * as React from "react";

export default function RoomPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <p>{params.slug}</p>
    </div>
  );
}
