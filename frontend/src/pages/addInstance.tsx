import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "@/components/ProductTable";
import Layout from "./layout";
import { Product } from "@/types/Product";

const AddInstance: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleCellClick = async (product: Product) => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/initialize-instance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: product.productName }),
      });

      const data = await response.json();
      if (response.ok) {
        const instanceId = data.instanceId;
        navigate(`/new-instance/${product.productName}/${instanceId}`);
      } else {
        console.error("Error initializing instance:", data.msg);
      }
    } catch (error) {
      console.error("Error initializing instance:", error);
    }
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
        <h1 className="text-2xl font-bold">Select a drone to start a new instance!</h1>
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

export default AddInstance;
