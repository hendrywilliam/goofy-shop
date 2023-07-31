import { prisma } from "@/server/db";
import { Shell } from "@/components/ui/shell";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import FilterController from "@/components/filter-controller";
import Image from "next/image";

//get all spaces with no filter applied
async function getSpaces(searchParams?: unknown) {
  if (searchParams["price"]) {
    const result = await prisma.space.findMany({
      where: {
        AND: [
          {
            price: {
              gte: 20000,
            },
          },
          {
            price: {
              lte: 80000,
            },
          },
        ],
      },
    });
    return result;
  }
  const results = await prisma.space.findMany();
  return results;
}

export default async function IndexPage({
  params,
  searchParams,
}: {
  params?: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const spaces = await getSpaces(searchParams);

  return (
    <main>
      <Shell custom="p-2 lg:px-20 py-4">
        <div className="mb-3">
          <FilterController />
        </div>
        <div className="w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {spaces?.map((item, index) => {
            return (
              <Card key={index}>
                <div className="relative w-full h-[70%] rounded-md">
                  <Image
                    style={{ objectFit: "cover" }}
                    src={item.photos[0].fileUrl}
                    alt={item.name}
                    fill
                    className="rounded-md"
                  />
                </div>
                <CardContent custom="pt-4">
                  <p className="truncate">{item.name}</p>
                  <p>IDR {item.price} / night</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Shell>
    </main>
  );
}
