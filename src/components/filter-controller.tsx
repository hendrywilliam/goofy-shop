"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/dialog";
import { IconFiltering } from "@/components/icons/icon-filtering";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FilterController() {
  const router = useRouter();

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger custom="flex flex-row space-x-2">
          <IconFiltering className="self-center" />
          <span>Filter</span>
        </AlertDialogTrigger>
        <AlertDialogContent custom="w-[90%] lg:w-[500px] h-max">
          <AlertDialogHeader>
            <p>Enable Filter</p>
            <AlertDialogClose />
          </AlertDialogHeader>
          <div>
            <Button onClick={() => router.push("/?price=20000")}>
              Apply filter
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
