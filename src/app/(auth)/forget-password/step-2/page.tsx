import * as React from "react";
import ForgetPasswordStepTwoForm from "@/components/forms/forget-password-step-2-form";

export default function page() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="border w-3/4 lg:w-1/2 p-4 rounded-md">
        <ForgetPasswordStepTwoForm />
      </div>
    </div>
  );
}
