import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { DialogBox } from './Dialogbox';
import { useParams } from 'react-router-dom';

interface Part {
  partLabel: string;
  partQuantity: number;
}

const PartTable: React.FC = () => {
  const [part, setPart] = useState<Part[]>([]);
  const { productName, componentLabel } = useParams<{ productName: string,componentLabel: string  }>();

  const fetchPart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${productName}/${componentLabel}`);
      const data = await response.json();
      setPart(data.parts);
      console.log(data)
    } catch (error) {
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
        part: {
          partLabel: data.name,
          partQuantity: Number(data.quantity)
        }
      }
    };

    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${productName}/${componentLabel}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPart),
      });
      if (response.ok) {
        fetchPart();
      }
      else {
          console.error('Error adding part');
        }
      }
     catch (error) { 
      console.error('Error adding part:', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <DialogBox 
        onItemAdded={fetchPart} 
        defaultHolder="2230 w/o motor" 
        handleSubmit={handleOnSubmit} 
        itemName="Part" 
      />
      <div className='mt-5 w-full justify-center items-center'>
        <DataTable
          data={part}
          headers={['S.No', 'Name of Part', 'Quantity']}
          keys={['partLabel', 'partQuantity']}
        />
      </div>
    </div>
  );
};

export default PartTable;
