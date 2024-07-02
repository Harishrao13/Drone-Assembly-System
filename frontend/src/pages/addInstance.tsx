import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "@/components/ProductTable";
import Layout from "./layout";
import { Product } from "@/types/Product";

const addInstance: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleCellClick = (product: Product) => {
    navigate(`/new-instance/${product.productName}`);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/add-product");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold">Select a drone to start new instance!</h1>
        <div className="mt-5 w-full justify-center items-center">
          <ProductTable
            data={products}
            headers={["S.No", "Name of Product", "Product Code"]}
            keys={["productName", "productCode"]}
            onRowClick={handleCellClick}
            showActions={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default addInstance;
