import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Home } from '@/pages/Home';
import { AddMember } from '@/pages/addMember';
import { AddModel }  from '@/pages/addModel';
import {ChangePassword} from '@/pages/auth/Profile';
import { AddAdmin } from '@/pages/addAdmin';
import AddProduct from '@/pages/addProduct';
import AddComponent from '@/pages/addComponent';
import AddPart from '@/pages/addPart';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/add-member' element={<AddMember />} />
          <Route path='/add-admin' element={<AddAdmin />} />
          <Route path='/add-product/:productName' element={<AddComponent />} /> 
          <Route path='/add-product/:productName/:componentLabel' element={<AddPart />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
