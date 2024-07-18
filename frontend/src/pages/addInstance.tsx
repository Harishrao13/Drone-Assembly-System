import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "@/components/ProductTable";
import Layout from "./layout";
interface Product {
  productName: string;
  productCode: string;
  assembledOn: string;
  _id: string;
}

const AddInstance: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [archivedInstances, setArchivedInstances] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleNewInstance = async (product: Product) => {
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

  const handleCellClick = (archivedInstance: Product) => {
    navigate(`/new-instance/${archivedInstance.productName}/${archivedInstance._id}`);
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/add-product");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchArchivedInstances = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/archived-instances");
      const data = await response.json();
      console.log(data.archivedInstances);
      setArchivedInstances(data.archivedInstances);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchArchivedInstances();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col w-full space-y-8">
        <h1 className="text-2xl font-bold">Select a drone to start a new instance!</h1>
        <div className="mt-5 w-full justify-center items-center">
          <ProductTable
            data={products}
            headers={["S.No", "Name of Product", "Product Code"]}
            keys={["productName", "productCode"]}
            onRowClick={handleNewInstance}
            showActions={false}
          />
        </div>
        <div className="flex-col space-y-8">
        <div className="text-3xl font-extrabold flex justify-center">OR</div>
        <h1 className="text-2xl font-bold">Archived: Pick where you left!</h1>
        </div>
        <div className="mt-5 w-full justify-center items-center">
          <ProductTable
            data={archivedInstances}
            headers={["S.No", "Name of Product","Last assembled on", "Assembler ID"]}
            keys={["productName", "assembledOn"]}
            onRowClick={handleCellClick}
            showActions={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddInstance;
