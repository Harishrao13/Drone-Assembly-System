import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from './layout';

export function Home() {
  const navigate = useNavigate();
  const handleInstance = () => {
    navigate('/new-instance')
  }
  return (
    <Layout>
      <div className="home flex flex-col space-y-24">
        <div className="font-bold text-4xl flex justify-items-start ">
        Track Component
        </div>
        <div className="grid w-full">
          <Label htmlFor="text" className="text-lg font-semibold">Enter Serial Number:</Label>
          <div className="flex flex-row items-center">
          <Input type="text" id="text" placeholder="PS22AM050001" className="h-12 text-lg bg-gray-200 mr-2" />
          <Button variant="outline" size="icon">
          <ChevronRight className="h-6 w-6" />
          </Button>
          </div>
        </div>
        <div>
        <Button onClick={() => {handleInstance()}} className="py-8 px-8 mt-8 text-lg bg-blue-800 hover:bg-blue-900 rounded-3xl">+ Add Instance</Button>
        </div>
      </div>
    </Layout>
  );
}
