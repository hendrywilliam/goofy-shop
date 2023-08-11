import * as React from "react";
import ForgotPasswordForm from "@/components/forms/forget-password-form";

export default function ForgetPassword() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="border w-3/4 lg:w-1/2 p-4 rounded-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
