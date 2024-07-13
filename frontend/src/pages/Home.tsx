import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import Layout from './layout';
import RightArrow  from "@/assets/icons/right-arrow.svg"

export function Home() {
  const navigate = useNavigate();
  const handleInstance = () => {
    navigate('/new-instance')
  }
  return (
    <Layout>
      <div className="home flex flex-col space-y-12">
        <div className="font-bold text-3xl flex justify-items-start">
        Track a Component
        </div>
        <div className="grid w-full">
          <Label htmlFor="text" className="text-lg font-semibold">Enter Serial Number:</Label>
          <div className="flex flex-row items-center">
          <Input type="text" id="text" placeholder="PS22AM050001" autoFocus={true} className="h-12 text-lg bg-gray-200 mr-2" />
          <img src={RightArrow} alt="logo" className="cursor-pointer" width={40} height={40}/>
          </div>
        </div>
        <div>
        <div className="font-bold text-2xl">
          OR
        </div>
        <Button onClick={() => {handleInstance()}} className="py-8 px-8 mt-8 text-lg bg-blue-800 hover:bg-blue-900 rounded-3xl">+ Add Instance</Button>
        </div>
      </div>
    </Layout>
  );
}
