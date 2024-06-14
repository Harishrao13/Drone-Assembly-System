import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Home } from '@/pages/Home';
import { AddProduct } from '@/pages/addProduct';
import { AddMember } from '@/pages/addMember';
import { AddModel }  from '@/pages/addModel';
import {ChangePassword} from '@/pages/auth/Profile';

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
          <Route path='/add-model' element={<AddModel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
