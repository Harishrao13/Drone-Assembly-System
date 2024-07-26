import Layout from "./layout";
import { useEffect, useState } from 'react';
import { ProductTable } from '@/components/ProductTable';
import { DialogBox } from '@/components/Dialogbox';
import { useParams } from 'react-router-dom';
import { Part } from "@/types/Part";
import { useToast } from "@/components/ui/use-toast";

const AddPart = () => {
  const [part, setPart] = useState<Part[]>([]);
  const { productName, componentLabel } = useParams<{ productName: string, componentLabel: string }>();
  const { toast } = useToast();


  const fetchPart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${productName}/${componentLabel}/parts`);
      const data = await response.json();
      setPart(data.parts);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error fetching part: ${error.message}`,
        variant: "destructive",
      });
      console.error('Error fetching part:', error);
    }
  };

  useEffect(() => {
    if (productName && componentLabel) {
      fetchPart();
    }
  }, [productName, componentLabel]);

  const handleOnSubmit = async (data: { [key: string]: string }) => {
    const newPart = {
      productName: productName as string,
      component: {
        componentLabel: componentLabel as string,
        partList: {
          partLabel: data.name,
          partCode: data.code,
          partQuantity: Number(data.quantity)
        }
      }
    };

    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${productName}/${componentLabel}/parts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPart),
      });
      if (response.ok) {
        fetchPart();
      } else {
        toast({
          title: "Error",
          description: data.msg || "Error adding part",
          variant: "destructive",
        });
        console.error('Error adding part');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error adding part: ${error.message}`,
        variant: "destructive",
      });
      console.error('Error adding part:', error);
    }
  };

  const handleDelete = async (part: Part) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${productName}/${componentLabel}/${part.partLabel}`, {
        method: 'DELETE',
      });
      if (response.status === 202) {
        fetchPart();
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.msg || "Error adding part",
          variant: "destructive",
        });
        console.error('Error deleting part');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error adding part: ${error.message}`,
        variant: "destructive",
      });
      console.error('Error deleting part:', error);
    }
  };

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center w-full'>
        <DialogBox
          onItemAdded={fetchPart}
          defaultHolder="2230 w/o motor"
          handleSubmit={handleOnSubmit}
          itemName="Part"
        />
        <div className='mt-5 w-full justify-center items-center'>
          <ProductTable
            data={part}
            headers={['S.No', 'Name of Part', 'Part Code', 'Quantity']}
            keys={['partLabel', 'partCode', 'partQuantity']} 
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddPart;
