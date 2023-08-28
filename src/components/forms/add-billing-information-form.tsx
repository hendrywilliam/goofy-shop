"use client";

import * as React from "react";
import { useZodForm } from "@/hooks/use-zod-form";
import { userBillingInformation } from "@/lib/validation/user";
import {
  Form,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { payoutBanks } from "@/config/payment";
import { toast } from "sonner";
import { IconLoading } from "@/components/icons/icon-loading";
import { Button } from "@/components/ui/button";

export default function AddBillingInformationForm() {
  const [isPending, startTransition] = React.useTransition();
  const form = useZodForm({
    schema: userBillingInformation,
    mode: "onSubmit",
  });

  const submitBillingInfo = form.handleSubmit(
    (data) => {
      //asign alias name for unique identifier of payout

      startTransition(async () => {
        const aliasName = `${data.name.replaceAll(" ", "")}${data.bank}`;
        const payoutData = Object.assign(data, {
          //pattern: name+bank+id
          alias_name: aliasName,
        });

        const request = await fetch("/api/midtrans/join-partner", {
          method: "POST",
          body: JSON.stringify(payoutData),
        });
        const response = await request.json();
        console.log(response);
      });
    },
    (error) => {
      const firstError = Object.values(error)[0];
      toast.error(firstError.message);
    }
  );

  return (
    <>
      <Form className="flex flex-col gap-4 mt-2" onSubmit={submitBillingInfo}>
        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput {...form.register("email")} name="email" />
        </FormField>
        <FormField>
          <FormLabel htmlFor="email">Name</FormLabel>
          <FormInput {...form.register("name")} name="name" />
        </FormField>
        <FormField>
          <FormLabel htmlFor="account">Account Number</FormLabel>
          <FormInput
            type="number"
            {...form.register("account", {
              valueAsNumber: true,
            })}
            name="account"
            min={1}
          />
        </FormField>
        <FormField custom="flex flex-col gap-2">
          <FormLabel>Select bank</FormLabel>
          <div className="grid grid-cols-4 w-full gap-2">
            {payoutBanks.map((item, i) => {
              return (
                <Button
                  variant="bordered"
                  key={i}
                  type="button"
                  onClick={() => {
                    form.setValue("bank", item.code);
                  }}
                >
                  {item.code.toUpperCase()}
                </Button>
              );
            })}
          </div>
        </FormField>
        <FormField>
          <Button
            custom="flex flex-row justify-center gap-2"
            type="submit"
            disabled={isPending}
          >
            {isPending && <IconLoading className="flex self-center" />} Confirm
          </Button>
        </FormField>
      </Form>
    </>
  );
}
