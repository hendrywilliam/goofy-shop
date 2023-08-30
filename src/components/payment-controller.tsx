"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { paymentChannels } from "@/config/payment";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { IconLoading } from "@/components/icons/icon-loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userPaymentValidation } from "@/lib/validation/space";
import { captureError, orderNumberGenerator } from "@/lib/utils";
import { type ChargeParameters } from "midtrans-client";
import {
  createReservation,
  updateReservation,
  deleteReservation,
} from "@/app/_actions/reservation";
import { useRouter } from "next/navigation";

interface PaymentController {
  totalPrice: string;
  spaceName: string;
  spaceId: string;
  //date time for reservation
  start: string;
  end: string;
}

export default function PaymentController({
  totalPrice,
  spaceName,
  spaceId,
  end,
  start,
}: PaymentController) {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedBank, setSelectedBank] = React.useState<string>();
  const [userData, setPaymentData] = React.useState<{
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const confirmPayment = React.useCallback(async () => {
    setIsLoading(true);
    try {
      if (typeof selectedBank === "undefined") {
        setIsLoading(false);
        return toast.error(
          "Please select channel payment first before proceed."
        );
      }

      if (!isLoaded) {
        return setIsLoading(false);
      }
      if (!isSignedIn) {
        router.push("/sign-in");
        return toast.error(
          "You are not logged in, redirecting to sign in page."
        );
      }

      if (!isSignedIn) {
        router.push("/sign-in");
        return toast.error(
          "You are not logged in, redirecting to sign in page."
        );
      }

      const parsedData = userPaymentValidation.parse(userData);

      const { data: currentReservation } = await createReservation({
        endDate: end,
        guestId: user?.id as string,
        spaceId,
        startDate: start,
        totalPrice,
      });

      const {
        email,
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone,
      } = parsedData;

      const params = {
        payment_type: "bank_transfer",
        transaction_details: {
          order_id: orderNumberGenerator(currentReservation.id),
          gross_amount: parseInt(totalPrice),
        },
        bank_transfer: {
          bank: selectedBank,
        },
        item_details: [
          {
            name: spaceName,
            id: spaceId,
            price: parseInt(totalPrice),
            quantity: 1,
          },
        ],
        customer_details: {
          email,
          first_name,
          last_name,
          phone,
          customer_details_required_fields: [email, first_name, phone],
        },
      } satisfies ChargeParameters;

      const attemptPayment = await fetch("/api/midtrans/payment", {
        method: "POST",
        body: JSON.stringify(params),
      });

      const res = await attemptPayment.json();

      //success
      if (res.data.status_code === "201") {
        await updateReservation({
          id: currentReservation.id,
          transaction_id: res.data.transaction_id,
        });
        toast("Reservation created. Please complete your payment.");
      }

      //fails then delete the existing reservation entity related.
      const successCodes = ["201", "200"];
      if (!successCodes.includes(res.data.status_code)) {
        await deleteReservation(currentReservation.id);
      }

      setIsLoading(false);
    } catch (err) {
      captureError(err);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [selectedBank, isLoaded, spaceName, totalPrice, userData]);

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
      <div className="w-full h-max mt-2">
        <h1 className="font-calsans text-xl">2. Input your personal data</h1>
        <ul className="flex flex-col gap-2">
          <li>
            <Label htmlFor="email" custom="text-muted">
              Email
            </Label>
            <Input
              name="email"
              custom="w-full xl:w-1/2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentData({
                  ...userData,
                  email: e.target.value,
                })
              }
            />
          </li>
          <li>
            <Label htmlFor="firstname" custom="text-muted">
              First Name
            </Label>
            <Input
              name="firstname"
              custom="w-full xl:w-1/2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentData({
                  ...userData,
                  firstName: e.target.value,
                })
              }
            />
          </li>
          <li>
            <Label htmlFor="lastname" custom="text-muted">
              Last Name
            </Label>
            <Input
              name="lastname"
              custom="w-full xl:w-1/2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentData({
                  ...userData,
                  lastName: e.target.value,
                })
              }
            />
          </li>
          <li>
            <Label htmlFor="phonenumber" custom="text-muted">
              Phone Number
            </Label>
            <Input
              name="phonenumber"
              custom="w-full xl:w-1/2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPaymentData({
                  ...userData,
                  phoneNumber: e.target.value.toString(),
                })
              }
              type="number"
            />
          </li>
        </ul>
      </div>
      <div className="w-full h-max mt-4">
        <h1 className="font-calsans text-xl">3. Confirm booking</h1>
        <Button
          onClick={confirmPayment}
          custom="flex flex-row justify-center gap-2"
          disabled={isLoading}
          type="button"
        >
          {isLoading && <IconLoading className="flex self-center" />}Confirm
          booking
        </Button>
      </div>
    </div>
  );
}
