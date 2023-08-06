import BecomeHostForm from "@/components/forms/become-host-form";
import { Shell } from "@/components/ui/shell";

export default function BecomeAHostPage() {
  return (
    <Shell custom="min-h-screen h-max flex flex-col lg:flex-row px-0 lg:px-20">
      <Shell custom="flex p-4 lg:p-0 border-b w-full lg:w-1/4 lg:border-r lg:border-b-0">
        <div className="flex flex-col w-full h-max text-start pt-2">
          <h1 className="font-calsans text-3xl">Become a host</h1>
          <p className="text-muted">Host anything you want</p>
          <p className="text-muted">Your place your rules.</p>
        </div>
      </Shell>
      <BecomeHostForm />
    </Shell>
  );
}
