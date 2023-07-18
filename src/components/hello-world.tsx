"use client";

//api obtained from /api/api hook createTRPCReact
import { api } from "@/lib/api/api";
import { Button } from "./ui/button";

export default function HelloWorld() {
  // const hello = api.hello.hello.useQuery();
  const addSpace = api.space.createSpace.useMutation();
  const delSpace = api.space.deleteSpace.useMutation();
  const addAmenity = api.amenity.createAmenity.useMutation();
  const delAmenity = api.amenity.deleteAmenity.useMutation();
  const addReview = api.review.createReview.useMutation();
  const delReview = api.review.deleteReview.useMutation();
  const addCity = api.city.createCity.useMutation();
  const delCity = api.city.deleteCity.useMutation();

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

  //add new amenities playground
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

  //add new review playground
  //3 req = userId, content, spaceId
  async function addNewReview() {
    const fakeDatas = [
      {
        userId: "60f04ee3e6e6f9571439f21a",
        content: "I love this place, amazing views, cute girls.",
        spaceId: "64b6232b802c1d2582a8ebec",
      },
      {
        userId: "60f9723f77d9d90f6095d2cf",
        content: "This is why i love this place, the owner is a cutie pie.",
        spaceId: "64b6232b802c1d2582a8ebec",
      },
    ];

    fakeDatas.forEach(async (item) => {
      const createReview = await addReview.mutateAsync({
        userId: item.userId,
        content: item.content,
        spaceId: item.spaceId,
      });
      console.log(createReview);
    });
  }

  async function deleteReview() {
    const deletedData = await delReview.mutateAsync({
      id: "64b631f724b8f0d2a4c5aafb",
    });
    console.log(deletedData);
  }

  async function createCity() {
    const createCity = await addCity.mutateAsync({
      name: "Jakarta",
    });
    console.log(createCity);
  }

  async function deleteCity() {
    const deleteCity = await delCity.mutateAsync({
      id: "64b641c26cd7e63cf2265f95",
    });
    console.log(deleteCity);
  }

  return (
    <div>
      <Button onClick={addNewSpace}>Add new space</Button>
      <Button onClick={addNewAmenities}>Add new amenities</Button>
      <Button onClick={deleteAmenity}>Delete amenity</Button>
      <Button onClick={addNewReview}>Add new review</Button>
      <Button onClick={deleteReview}>Delete review</Button>
      <Button onClick={createCity}>Create City</Button>
      <Button onClick={deleteCity}>Delete City</Button>
    </div>
  );
}
