import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Home } from '@/pages/Home';
import { AddEmployee } from '@/pages/addEmployee';
import {ChangePassword} from '@/pages/auth/Profile';
import AddDrone from '@/pages/addDrone';
import AddComponent from '@/pages/addComponent';
import AddPart from '@/pages/addPart';
import AddInstance from '@/pages/addInstance';
import NewInstance from '@/pages/newInstance';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-product' element={<AddDrone />} />
          <Route path='/add-employee' element={<AddEmployee />} />
          <Route path='/add-product/:productName/components' element={<AddComponent />} /> 
          <Route path='/add-product/:productName/:componentLabel/parts' element={<AddPart />} />
          <Route path='/new-instance' element={<AddInstance />} />
          <Route path='/new-instance/:productName/:instanceId' element={<NewInstance />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
