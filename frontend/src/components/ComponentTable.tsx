import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataTable } from './DataTable';
import { DialogBox } from './Dialogbox';

interface Component {
  componentLabel: string;
  componentCode: string;
}

const ComponentTable: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const { productName } = useParams<{ productName: string }>();
  const navigate = useNavigate();

  const handleCellClick = (component: Component) => {
    navigate(`/add-product/${productName}/${component.componentLabel}`);
  };

  const fetchComponents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${productName}`);
      const data = await response.json();
      setComponents(data.components);
    } catch (error) {
      console.error('Error fetching components:', error);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [productName]);

  const handleOnSubmit = async (data: { [key: string]: string }) => {
    const newComponent = {
      productName: productName as string,
      component: {
        componentLabel: data.name,
        componentCode: data.code,
      },
    };  

    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${productName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComponent),
      });
      if (response.ok) {
        fetchComponents();
      } else {
        console.error('Error adding component');
      }
    } catch (error) {
      console.error('Error adding component:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <DialogBox
        onItemAdded={fetchComponents}
        defaultHolder="Nozzle"
        handleSubmit={handleOnSubmit}
        itemName="Component"
      />
      <div className="mt-5 w-full justify-center items-center">
        <DataTable
          data={components}
          headers={['S.No', 'Name of Component', 'Component Code']}
          keys={['componentLabel', 'componentCode']}
          onRowClick={handleCellClick}
        />
      </div>
    </div>
  );
};

export default ComponentTable;
