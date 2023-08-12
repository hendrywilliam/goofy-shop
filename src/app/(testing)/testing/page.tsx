"use client";

import * as React from "react";

export default function TestingPage() {
  async function TestMidtrans() {
    const result = await fetch("/api/midtrans", {
      method: "POST",
    });
    const reader = result.body?.getReader();
    let res = "";
    while (true) {
      if (reader !== undefined) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = new TextDecoder().decode(value);
        res += chunk;
      }
    }
    console.log(res);
  }

  return (
    <div>
      <button onClick={() => TestMidtrans()}>Test</button>
    </div>
  );
}
