import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Home } from '@/pages/Home';
import { AddMember } from '@/pages/addMember';
import {ChangePassword} from '@/pages/auth/Profile';
import AddDrone from '@/pages/addDrone';
import AddComponent from '@/pages/addComponent';
import AddPart from '@/pages/addPart';
import AddInstance from '@/pages/addInstance';
import NewInstance from '@/pages/newInstance';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/add-product' element={<AddDrone />} />
          <Route path='/add-member' element={<AddMember />} />
          <Route path='/add-product/:productName' element={<AddComponent />} /> 
          <Route path='/add-product/:productName/:componentLabel' element={<AddPart />} />
          <Route path='/new-instance' element={<AddInstance />} />
          <Route path='/new-instance/:productName' element={<NewInstance />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
