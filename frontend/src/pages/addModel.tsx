import Layout from './layout';
import ProductTable from "@/components/ProductTable";
import { modelNames } from '@/constants/index';
import { DialogBox } from "@/components/AddDialogbox"

export function AddModel() {
  return (
    <Layout>
    <div className='flex flex-center flex-col'>
        <ProductTable productFunction={modelNames}/>
        <DialogBox />
    </div>
    </Layout>
  )
};





