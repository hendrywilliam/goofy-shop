import SignInForm from "@/components/forms/signin-form";

export default function SigninPage() {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="border w-1/2 p-4 rounded-md">
        <SignInForm />
      </div>
    </div>
  );
}
