"use client";

import { api } from "@/lib/api";

export default function HelloWorld() {
  const hello = api.hello.hello.useQuery();
  return (
    <div>
      <p>{hello.data?.data}</p>
    </div>
  );
}
