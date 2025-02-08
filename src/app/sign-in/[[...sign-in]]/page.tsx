import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#030303]">
      <SignIn forceRedirectUrl={"/drive"} />
    </div>
  );
}
