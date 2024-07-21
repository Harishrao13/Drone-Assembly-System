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
import { useEffect, useState } from 'react';

const App = () => {
  const isAdmin = true;
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/v1/auth/userinfo', {
  //         method: 'GET',
  //         credentials: 'include',
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //       if (data.authority) {
  //         setIsAdmin(true);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user info:', error);
  //     }
  //   };

  //   fetchUserInfo();
  // }, []);

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
