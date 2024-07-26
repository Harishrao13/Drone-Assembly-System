import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import { useUser } from './hooks/userContext';

const App = () => {

  const { isAdmin } = useUser();

  return (
    <Router>
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
            {isAdmin ? <Dashboard /> : <Navigate to="/home" />}
          </RequireAuth>
        } />
        <Route path='/add-product' element={
          <RequireAuth fallbackPath='/'>
            {isAdmin ? <AddDrone /> : <Navigate to="/home" />}
          </RequireAuth>
        } />
        <Route path='/add-employee' element={
          <RequireAuth fallbackPath='/'>
            {isAdmin ? <AddEmployee /> : <Navigate to="/home" />}
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
    </Router>
  );
};

export default App;
