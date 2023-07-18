import HelloWorld from "@/components/hello-world";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <p>
        A simple space-shop website written in Typescript and a minimal adoption
        of tRPC
      </p>
      <HelloWorld />
      <Button color="destructive" size="md">
        Button
      </Button>
    </main>
  );
}
