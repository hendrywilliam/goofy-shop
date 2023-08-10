"use client";

import * as React from "react";

export default function TestingPage() {
  async function testaja() {
    const ngab = await fetch("/api/midtrans", {
      method: "POST",
    });
    console.log(ngab);
  }

  return (
    <div>
      <button onClick={() => testaja()}>Test</button>
    </div>
  );
}
