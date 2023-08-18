import * as React from "react";
import { Shell } from "@/components/ui/shell";
import { formatCurrency } from "@/lib/utils";

export default function DashboardBillingPage() {
  return (
    <Shell custom="flex flex-col h-[700px] lg:h-screen justify-center lg:items-center p-2 lg:px-20">
      <div className="w-full lg:w-1/2 lg:h-[600px] my-4">
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted">
          Gather everything about your billing information.
        </p>
        <div className="grid grid-cols-1 xl:grid-cols-3 w-full gap-4 mt-2">
          <div className="flex flex-col gap-2 border p-4 rounded-md text-sm drop-shadow-xl">
            <p className="text-muted">Total earning</p>
            <h1 className="text-xl font-bold">{formatCurrency(0)}</h1>
          </div>
          <div className="flex flex-col gap-2 border p-4 rounded-md text-sm drop-shadow-xl">
            <p className="text-muted">Total transaction</p>
            <h1 className="text-xl font-bold">0</h1>
          </div>
          <div className="flex flex-col gap-2 border p-4 rounded-md text-sm drop-shadow-xl">
            <p className="text-muted">Active transaction</p>
            <h1 className="text-xl font-bold">0</h1>
          </div>
        </div>
        <div className="flex flex-col w-full border mt-4 rounded-md p-4">
          <h1 className="text-3xl font-bold">Billing Status</h1>
          <p className="text-muted text-sm">
            Join as a Partner and start accepting payment.
          </p>
        </div>
      </div>
    </Shell>
  );
}
