import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../components/ui/input';
import { ChevronRight } from "lucide-react";
import Layout from './layout';
import DataTable from '@/components/DataTable';
import { Separator } from '@/components/ui/separator';

const newInstance = () => {
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(serialNumber);

    try {
      const response = await fetch(`http://localhost:5000/api/v1/new-instance/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serialNumber),
      });
      if(response.ok){
        console.log('Serial number added successfully');
      } else {
        console.error('Error adding serial number');
      }
    } catch (error) {
      console.error('Error handling serial number:', error);
    }
    

  };

  return (
    <Layout>
      <div className="home flex flex-col">
        <div className="grid w-full">
          <form onSubmit={handleSubmit}>
            <Label htmlFor="text" className="text-lg font-semibold">
              Enter Serial Number:
            </Label>
            <div className="flex flex-row items-center">
              <Input
                type="text"
                id="text"
                placeholder="PA24MB0600051"
                className="h-12 text-lg bg-gray-200 mr-2"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
              <Button className="bg-blue-600 hover:bg-blue-500 rounded-md size-10" type='submit'>
              <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
              </Button>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-green-800 font-bold">Status: 'Ready to Sky RS 2306' successfully scanned.</h1>
      </div>
      <div className="w-full">
        <Separator />
        <DataTable />
      </div>

    </Layout>
  );
};

export default newInstance;
