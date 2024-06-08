import Layout from './layout';
import ProductTable from "@/components/ProductTable";

export function AddProduct() {
  return (
    <Layout>
      <div className='flex flex-center flex-col'>
        <ProductTable />
      </div>
    </Layout>
  );
}
