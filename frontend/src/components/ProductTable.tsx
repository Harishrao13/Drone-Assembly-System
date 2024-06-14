import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from '@/constants/index';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface ProductTableProps {
  productFunction: () => Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ productFunction }) => {
  const products = productFunction();

  return (
    <div className="bg-white rounded-lg flex flex-col justify-center w-full md:w-2/3 lg:w-3/4 xl:w-4/5 2xl:w-3/4 p-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-full">S.No</TableHead>
            <TableHead>Name of Product</TableHead>
            <TableHead>Product Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='cursor-pointer'>
          {products.map((product, index) => (
            <TableRow key={index + 1}>
              <TableCell className="font-medium">{String(index + 1).padStart(2, '0')}</TableCell>
              <TableCell>{product.label}</TableCell>
              <TableCell>{product.code}</TableCell>
              <TableCell><BsThreeDotsVertical /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
