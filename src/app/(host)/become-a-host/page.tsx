import BecomeHostForm from "@/components/forms/become-host-form";
import { Shell } from "@/components/ui/shell";

export default function BecomeAHostPage() {
  return (
    <Shell custom="min-h-screen h-max flex flex-col lg:flex-row px-0 lg:px-20">
      <BecomeHostForm />
    </Shell>
  );
}
