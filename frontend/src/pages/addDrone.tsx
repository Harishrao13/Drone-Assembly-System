import Layout from "./layout";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductTable } from '@/components/ProductTable';
import { DialogBox } from '@/components/Dialogbox';
import { useToast } from "@/components/ui/use-toast"
import { Product } from '@/types/Product';

const addDrone = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

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
        const data = await response.json();
        fetchProducts();
        toast({
          title: "Success",
          description: `Successfully added serial number to  ${data.partLabel}`,
          variant: "success",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.msg || "Error adding component",
          variant: "destructive",
        });
        
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error adding serial number: ${error.message}`,
        variant: "destructive",
      });
      console.error('Error adding serial number:', error);
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