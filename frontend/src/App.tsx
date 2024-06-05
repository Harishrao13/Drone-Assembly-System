import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Home } from '@/pages/Home';
import { AddProduct } from '@/pages/addProduct';
import { AddMember } from '@/pages/addMember';
import { AddAdmin } from '@/pages/addAdmin';
import { AddModel }  from '@/pages/addModel';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/add-member' element={<AddMember />} />
          <Route path='/add-admin' element={<AddAdmin />} />
          <Route path='/add-model' element={<AddModel />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
