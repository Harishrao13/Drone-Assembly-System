import Layout from "./layout";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductTable } from '@/components/ProductTable';
import { DialogBox } from '@/components/Dialogbox';

import { Product } from '@/types/Product';

const addDrone = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleCellClick = (product: Product) => {
    navigate(`/add-product/${product.productName}/components`);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/add-product');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOnSubmit = async (data: { [key: string]: string }) => {
    const newComponent: Product = {
      productName: data.name,
      productCode: data.code,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComponent),
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error("Error adding component");
      }
    } catch (error) {
      console.error('Error adding component:', error);
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/add-product/${product.productName}`, {
        method: "DELETE",
      });
      if (response.status === 202) {
        fetchProducts();
      } else {
        console.log(response.status)
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center w-full'>
      <DialogBox
          onItemAdded={fetchProducts} 
          defaultHolder="Tejas-U" 
          handleSubmit={handleOnSubmit} 
          itemName="Drone" 
        />
        <div className='mt-5 w-full justify-center items-center'>
      <ProductTable
        data={products}
        headers={['S.No', 'Name of Product', 'Product Code']}
        keys={['productName', 'productCode']}
        onRowClick={handleCellClick}
        onDelete={handleDelete}
      />
        </div>
    </div>
    </Layout>
  )
}

export default addDrone