"use client";

//api obtained from /api/api hook createTRPCReact
import { api } from "@/lib/api/api";
import { Button } from "./ui/button";
import { useState } from "react";

export default function HelloWorld() {
  // const hello = api.hello.hello.useQuery();
  const addSpace = api.space.createSpace.useMutation();
  const delSpace = api.space.deleteSpace.useMutation();
  const addAmenity = api.amenity.createAmenity.useMutation();
  const delAmenity = api.amenity.deleteAmenity.useMutation();
  const [data, setData] = useState();

  //example crud for space
  //@ts-ignore
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
  }

  async function addNewAmenities() {
    const createAmenityData = await addAmenity.mutateAsync({
      name: "Free wifi sampe kiamat",
      spaceId: "64b6232b802c1d2582a8ebec",
    });
    console.log(createAmenityData);
  }

  async function deleteAmenity() {
    const deleteAmenity = await delAmenity.mutateAsync({
      id: "64b624a6ea8fe32a5b44d9da",
    });
    console.log(deleteAmenity);
  }

  return (
    <div>
      <Button onClick={addNewSpace}>Add new space</Button>
      <Button onClick={addNewAmenities}>Add new amenities</Button>
      <Button onClick={deleteAmenity}>Delete amenity</Button>
    </div>
  );
}
