import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import  RightArrow  from "@/assets/icons/right-arrow.svg"
import Layout from './layout';

export function Home() {
  const navigate = useNavigate();
  const handleInstance = () => {
    navigate('/new-instance')
  }
  return (
    <Layout>
      <div className="home flex flex-col">
        <div className="">
          <Button className="py-8 px-8 text-lg bg-blue-800 hover:bg-blue-900 rounded-3xl">Scan QR code</Button>
        </div>
        <h1 className="h3-bold py-8">OR</h1>
        <div className="grid w-full">
          <Label htmlFor="text" className="text-lg font-semibold">Enter Serial Number:</Label>
          <div className="flex flex-row items-center">
          <Input type="text" id="text" placeholder="PS22AM050001" className="h-12 text-lg bg-gray-200 mr-2" />
          <img src={RightArrow} alt="logo" className="cursor-pointer" width={40} height={40}/>
          </div>
        </div>
        <div>
        <Button onClick={() => {handleInstance()}} className="py-8 px-8 mt-8 text-lg bg-blue-800 hover:bg-blue-900 rounded-3xl">+ Add Instance</Button>
        </div>
      </div>
    </Layout>
  );
}
