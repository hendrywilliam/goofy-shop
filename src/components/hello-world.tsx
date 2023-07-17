"use client";

//api obtained from /api/api hook createTRPCReact
import { api } from "@/lib/api/api";
import { Button } from "./ui/button";
import { useState } from "react";

export default function HelloWorld() {
  // const hello = api.hello.hello.useQuery();
  const addSpace = api.space.createSpace.useMutation();
  const delSpace = api.space.deleteSpace.useMutation();
  const [data, setData] = useState();

  //example crud for space
  function addNewSpace(): any {
    const createData = addSpace.mutate({
      authorId: "60f9723f77d9d90f6095d2cf",
      name: "Testing dulu",
      cityId: "60f9724077d9d90f6095d2d0",
      description: "amazing space, whoever read this you are blyatiful",
      numberRooms: 2,
      numberBathrooms: 10,
      maxGuest: 100,
      price: 696969,
    });
    console.log(createData);
    setData(createData);
  }

  return (
    <div>
      <Button onClick={addNewSpace}>Add new space</Button>
    </div>
  );
}
