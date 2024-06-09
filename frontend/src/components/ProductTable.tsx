import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DataTable} from './DataTable';

interface Product {
  productName: string;
  productCode: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleCellClick = (product: Product) => {
    navigate(`/add-product/${product.productName}`);
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

  return (
    <DataTable
      data={products}
      headers={['S.No', 'Name of Product', 'Product Code']}
      keys={['productName', 'productCode']}
      onRowClick={handleCellClick}
      fetchItems={fetchProducts}
    />
  );
};

export default ProductTable;
