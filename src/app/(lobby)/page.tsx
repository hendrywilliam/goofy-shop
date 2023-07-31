import HelloWorld from "@/components/hello-world";
import { prisma } from "@/server/db";
import { Shell } from "@/components/ui/shell";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

async function getAllSpaces() {
  const results = await prisma.space.findMany();
  return results;
}

export default async function IndexPage() {
  const spaces = await getAllSpaces();

  return (
    <main>
      <Shell custom="p-2 lg:px-20 py-4">
        <div className="w-full h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {spaces.map((item, index) => {
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
