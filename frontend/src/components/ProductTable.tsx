import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from '@/types/Product';
import { DialogBox } from '@/components/Dialogbox';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleCellClick = (product : Product) => {
    const {productName} = product
    navigate(`/add-product/${productName}`)
  }

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

  return (
    <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col justify-center'>
      <div className='flex flex-col items-center mb-4'>
      <DialogBox onProductAdded={fetchProducts}/>
      </div>
    <div className="bg-white rounded-lg  ">
      <Table>
        <TableHeader className='cursor-default'>
          <TableRow>
            <TableHead className="max-w-full">S.No</TableHead>
            <TableHead>Name of Product</TableHead>
            <TableHead>Product Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='cursor-pointer'>
          {products.map((product, index) => (
            <TableRow key={index} onClick={() => {handleCellClick(product)}}>
              <TableCell className="font-medium">{String(index + 1).padStart(2, '0')}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.productCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  );
};

export default ProductTable;
