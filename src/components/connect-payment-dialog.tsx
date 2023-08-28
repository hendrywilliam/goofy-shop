import * as React from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/dialog";
import AddBillingInformationForm from "./forms/add-billing-information-form";

export default function ConnectPaymentDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Connect Payment</AlertDialogTrigger>
      <AlertDialogContent custom="w-[90%] lg:w-[500px] h-max">
        <AlertDialogHeader>
          <div className="flex">
            <p className="self-center">Add billing information</p>
          </div>
          <AlertDialogClose />
        </AlertDialogHeader>
        <div className="w-full h-[300px] border p-4 overflow-y-auto rounded-md">
          <p className="text-muted">
            Make sure your billing information is valid
          </p>
          <AddBillingInformationForm />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
