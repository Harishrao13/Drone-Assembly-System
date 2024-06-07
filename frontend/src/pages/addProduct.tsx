import Layout from './layout';
import ProductTable from "@/components/ProductTable";
import { productNames } from '@/constants/index';
import { DialogBox } from '@/components/AddDialogbox';

export function AddProduct() {
  return (
    <Layout>
    <div className='flex flex-center flex-col'>
      <ProductTable productFunction={productNames}/>
      <DialogBox />
    </div>
    </Layout>
  )
};