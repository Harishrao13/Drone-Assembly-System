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

interface ProductTableProps {
  productFunction: () => Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ productFunction }) => {
  const products = productFunction();

  return (
    <div className="bg-white rounded-lg flex flex-col justify-center w-full md:w-3/4 lg:w-1/2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-full">S.No</TableHead>
            <TableHead>Name of Product</TableHead>
            <TableHead>Product Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index + 1}>
              <TableCell className="font-medium">{String(index + 1).padStart(2, '0')}</TableCell>
              <TableCell>{product.label}</TableCell>
              <TableCell>{product.code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
