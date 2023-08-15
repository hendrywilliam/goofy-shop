"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { paymentChannels } from "@/config/payment";
import { type ChargeParameters } from "@/types/midtrans-client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { IconLoading } from "@/components/icons/icon-loading";

interface PaymentController {
  totalPayment: string;
  spaceName: string;
}

export default function PaymentController({
  totalPayment,
  spaceName,
}: PaymentController) {
  const [selectedBank, setSelectedBank] = React.useState<string>();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const confirmPayment = React.useCallback(async () => {
    setIsLoading(true);
    if (typeof selectedBank === "undefined") {
      setIsLoading(false);
      return toast.error("Please select channel payment first before proceed.");
    }

    if (!isLoaded) {
      return setIsLoading(false);
    }

    const params = {
      payment_type: "bank_transfer",
      transaction_details: {
        order_id: "MIDTRANS696969",
        gross_amount: parseInt(totalPayment),
      },
      bank_transfer: {
        bank: selectedBank,
      },
      item_details: [
        {
          name: spaceName,
          id: "MIDTRANS696969",
          price: parseInt(totalPayment),
          quantity: 1,
        },
      ],
      customer_details: {
        email: user?.emailAddresses ? user.emailAddresses[0].emailAddress : "",
        first_name: user?.firstName ? user.firstName : "",
        last_name: user?.lastName ? user.lastName : "",
        //string sequence of emails, first_name, phone
        customer_details_required_fields: [
          user?.emailAddresses[0].emailAddress ?? "",
          user?.firstName ?? "",
        ],
      },
    } satisfies ChargeParameters;

    //@todo add new field for firstname, lastname, phone number in sign up form
    const attemptPayment = await fetch("/api/midtrans", {
      method: "POST",
      body: JSON.stringify(params),
    });
    console.log(attemptPayment);
    setIsLoading(false);
  }, [selectedBank]);

  return (
    <div className="flex flex-col w-full h-max">
      <p className="text-muted">We only support these payment channels</p>
      <div className="flex flex-col xl:flex-row w-full h-full gap-2 mt-2">
        {paymentChannels.map((item, i) => {
          return (
            <Button
              variant="bordered"
              key={i}
              value={item.bank}
              onClick={() => setSelectedBank(item.bank)}
            >
              {item.name}
            </Button>
          );
        })}
      </div>
      <div className="w-full h-max mt-2">
        <p className="text-muted">
          (Selected payment channel{" "}
          {selectedBank ? (
            <span className="font-bold">{selectedBank?.toUpperCase()}</span>
          ) : (
            <span className="font-bold">None</span>
          )}
          )
        </p>
      </div>
      <div className="w-full h-max mt-4">
        <Button
          onClick={confirmPayment}
          custom="flex flex-row justify-center gap-2"
        >
          {isLoading && <IconLoading className="flex self-center" />}Confirm
          Payment
        </Button>
      </div>
    </div>
  );
}
