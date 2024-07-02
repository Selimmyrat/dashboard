// import { Button } from "../../components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Triangle } from "lucide-react";

export default function Login() {
  return (
    <div className="flex flex-row">
      <div className="h-screen basis-1/2 bg-black flex flex-col justify-between px-5 py-7">
        <div className="flex flex-row">
          <Button
            className="text-white"
            variant="outline"
            size="icon"
            aria-label="Home"
          >
            <Triangle className="size-5 text-white fill-foreground" />
          </Button>
          <div className="flex justify-center items-center ml-3 uppercase">
            <h2 className="text-white font-semibold text-xl">Company Name</h2>
          </div>
        </div>
        <div className="text-white">
          <p className="text-xl">“This library has saved me countless hours of work and
            helped me deliver stunning designs to my clients faster than ever
            before.”
          </p>
          <p className="mt-3 text-lg">Sofia Davis</p>
        </div>
      </div>
      <div className="h-screen basis-1/2 bg-white content-center">
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <div className="mb-5">
              <h1 className=" font-semibold text-2xl mb-1">Login</h1>
              <p>Enter your email below to login to your account.</p>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="mt-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button className="border-2 bg-black text-white px-16 hover:bg-white hover:text-black hover:border-black">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
