import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function UserNotFoundPage() {
  return (
    <div className="relative flex w-full h-screen justify-center items-center">
      <div className="absolute flex flex-col rounded-md p-10 top-20 text-center gap-2">
        <h1 className="font-bold">Spaceshop</h1>
        <p className="text-muted">Oopsie, no such data found :(</p>
        <Link className={buttonVariants()} href="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
