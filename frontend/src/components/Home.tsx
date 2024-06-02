import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import Sidebar from "@/components/shared/Sidebar";

export function Home() {
  return (
    <div className="flex flex-row ">
      <Sidebar />
      <div className="home">
        <div className="mb-12">
          <Button className="py-8 px-8 text-lg">Scan QR code</Button>
        </div>
        <h1 className="h3-bold py-8">OR</h1>
        <div className="grid w-full">
          <Label htmlFor="text" className=" text-lg font-semibold">Enter Serial Number:</Label>
          <Input type="text" id="text" placeholder="PS22AM050001" className="h-12 text-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
