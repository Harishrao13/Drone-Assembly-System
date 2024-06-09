import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {DataTable} from './DataTable';

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
  }, []);
  //products dep arr

  return (
    <DataTable
      data={components}
      headers={['S.No', 'Name of Component', 'Component Code']}
      keys={['componentLabel', 'componentCode']}
      onRowClick={handleCellClick}
      fetchItems={fetchComponents}
    />
  );
};

export default ComponentTable;
