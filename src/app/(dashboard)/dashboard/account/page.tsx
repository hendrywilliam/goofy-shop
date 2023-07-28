import * as React from "react";
import { Shell } from "@/components/ui/shell";
import ManageAccountForm from "@/components/forms/manage-account-form";

export default async function DashboardAccountPage() {
  return (
    <Shell custom="flex flex-col h-[500px] lg:h-screen justify-center lg:items-center p-2 lg:px-20">
      <ManageAccountForm />
    </Shell>
  );
}
