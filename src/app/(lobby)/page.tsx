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
import { type FilteredValue } from "@/types";
import { getSpaces } from "@/app/_actions/space";
import Link from "next/link";

export default async function IndexPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: FilteredValue;
}) {
  const spaces = await getSpaces(searchParams);

  return (
    <main>
      <Shell custom="p-2 lg:px-20 py-4">
        <div className="flex flex-col mb-3 w-full h-max items-end">
          <FilterController />
        </div>
        <div className="w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {spaces?.map((item, index) => {
            return (
              <Link href={`/rooms/${item.id}`} key={index} className="h-max">
                <Card>
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
                    <p className="font-semibold truncate">{item.name}</p>
                    <p className="text-muted">IDR {item.price} night</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Shell>
    </main>
  );
}
