import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Home } from '@/pages/Home';
import { AddEmployee } from '@/pages/addEmployee';
import { ChangePassword } from '@/pages/auth/Profile';
import AddDrone from '@/pages/addDrone';
import AddComponent from '@/pages/addComponent';
import AddPart from '@/pages/addPart';
import { TrackInstance } from '@/pages/trackInstance';
import AddInstance from '@/pages/addInstance';
import NewInstance from '@/pages/newInstance';
import Dashboard from '@/pages/Dashboard';
import RequireAuth from '@auth-kit/react-router/RequireAuth'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={
            <RequireAuth fallbackPath='/'>
              <Home />
            </RequireAuth>
          } />
          <Route path='/change-password' element={
            <RequireAuth fallbackPath='/'>
              <ChangePassword />
            </RequireAuth>
          } />
          <Route path='/dashboard' element={
            <RequireAuth fallbackPath='/'>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path='/add-product' element={
            <RequireAuth fallbackPath='/'>
              <AddDrone />
            </RequireAuth>
          } />
          <Route path='/add-employee' element={
            <RequireAuth fallbackPath='/'>
              <AddEmployee />
            </RequireAuth>
          } />
          <Route path='/track-instance/:instanceId' element={
            <RequireAuth fallbackPath='/'>
              <TrackInstance />
            </RequireAuth>
          } />
          <Route path='/add-product/:productName/components' element={
            <RequireAuth fallbackPath='/'>
              <AddComponent />
            </RequireAuth>
          } />
          <Route path='/add-product/:productName/:componentLabel/parts' element={
            <RequireAuth fallbackPath='/'>
              <AddPart />
            </RequireAuth>
          } />
          <Route path='/new-instance' element={
            <RequireAuth fallbackPath='/'>
              <AddInstance />
            </RequireAuth>
          } />
          <Route path='/new-instance/:productName/:instanceId' element={
            <RequireAuth fallbackPath='/'>
              <NewInstance />
            </RequireAuth>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
