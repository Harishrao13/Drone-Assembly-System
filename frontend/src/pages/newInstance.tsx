import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../components/ui/input';
import { ChevronRight } from "lucide-react";
import Layout from './layout';
import DataTable from '@/components/DataTable';
import { Separator } from '@/components/ui/separator';

const NewInstance = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const { productName, instanceId } = useParams();
  const [partName, setPartName] = useState('');
  const [assembledCounts, setAssembledCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [dataTableKey, setDataTableKey] = useState(0);

  useEffect(() => {
    fetchAssembledCounts();
  }, [productName, instanceId, partName]);

  const fetchAssembledCounts = async () => {
    console.log("fetching assembled counts")
    try {
      const response = await fetch(`http://localhost:5000/api/v1/instance/${productName}/${instanceId}/assembled-counts`);
      if (response.ok) { 
        const data = await response.json();
        setAssembledCounts(data.assembledCounts);
        console.log("from newInstance",data.assembledCounts)
        setLoading(false);
        setDataTableKey(prevKey => prevKey + 1);
      } else {
        console.error('Error fetching assembled counts');
      }
    } catch (error) {
      console.error('Error fetching assembled counts:', error);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/v1/instance/${productName}/${instanceId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serialNumber: serialNumber }),
      });
      if (response.ok) {
        console.log('Serial number added successfully');
        const data = await response.json();
        setPartName(data.partLabel);
        fetchAssembledCounts();
      } else {
        console.error('Error adding serial number');
      }
    } catch (error) {
      console.error('Error handling serial number:', error);
    }
    setSerialNumber('');
  };

  return (
    <Layout>
      <div className="home flex flex-col">
        <div className="grid w-full">
          <form onSubmit={handleSubmit}>
            <Label htmlFor="text" className="text-lg font-semibold flex justify-start">
              Scan QR or Enter Serial Number:
            </Label>
            <div className="flex flex-row items-center">
              <Input
                type="text"
                id="text"
                placeholder="PA24MB0600051"
                className="h-12 text-lg bg-gray-200 mr-2"
                value={serialNumber}
                autoFocus={true}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
              <Button type="submit" variant="outline" size="icon" className="rounded-full p-1 bg-white">
                <ChevronRight className="h-10 w-10 text-black" />
              </Button>
            </div>
          </form>
        </div>
    </div>
      <div>
        {partName && <h1 className="text-green-800 font-bold">Status: {partName} successfully scanned.</h1>}
      </div>
      <div className="w-full">
        <Separator />
        {!loading && <DataTable key={dataTableKey} assembledCounts={assembledCounts} />}
      </div>
    </Layout>
  );
};

export default NewInstance;
