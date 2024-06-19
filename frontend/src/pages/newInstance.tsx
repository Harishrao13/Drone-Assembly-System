import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import  RightArrow  from "@/assets/icons/right-arrow.svg"
import Layout from './layout';
import DataTable from "@/components/DataTable";
import { Separator } from "@/components/ui/separator";

const  newInstance = () => {
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
      </div>
      <div>
        <h1 className="text-green-800 font-bold">Status: 'Ready to Sky RS 2306' successfully scanned.</h1>
      </div>
      <div className="w-full ">
        <Separator />
        <DataTable />
      </div>
    </Layout>
  );
}

export default newInstance;