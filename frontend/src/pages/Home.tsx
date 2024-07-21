import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import Layout from './layout';
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function Home() {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useState('');
  const { toast } = useToast();


  const handleInstance = () => {
    navigate('/new-instance');
  }

  const handleTrackComponent = async (serialNumber : string) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/track-instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serialNumber }),
      });
      const result = await response.json();
      const instanceId = result._id;

      if (instanceId) {
        navigate(`/track-instance/${instanceId}`);
      } else {
        toast({
          title: "Error",
          description: result.msg || "ID not found",
          variant: "destructive",
        });
        console.error("No ID found in the response");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error fetching data: ${error.message}`,
        variant: "destructive",
      });
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    handleTrackComponent(serialNumber); 
  }
  
  return (
    <Layout>
      <div className="home flex flex-col space-y-12">
        <div className="font-bold text-3xl flex justify-items-start">
          Track a Component
        </div>
        <form className="grid w-full" onSubmit={handleSubmit}>
          <Label htmlFor="serialNumber" className="text-lg font-semibold">Enter Serial Number:</Label>
          <div className="flex flex-row items-center">
            <Input 
              type="text" 
              id="serialNumber" 
              value={serialNumber} 
              onChange={(e) => setSerialNumber(e.target.value)} 
              placeholder="PS22AM050001" 
              className="h-12 text-lg bg-gray-200 mr-2" 
            />
            <Button variant="outline" size="icon" className="rounded-full p-1 bg-white border" type="submit">
              <ChevronRight className="h-10 w-10 text-black" />
            </Button>
          </div>
        </form>
        <div>
          <div className="font-bold text-2xl">
            OR
          </div>
          <Button onClick={handleInstance} className="py-8 px-8 mt-8 text-lg bg-blue-800 hover:bg-blue-900 rounded-3xl">
            + Add Instance
          </Button>
        </div>
      </div>
    </Layout>
  );
}
