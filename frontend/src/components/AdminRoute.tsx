// @ts-nocheck
import { Route, Navigate } from 'react-router-dom';

const AdminRoute = ({ element, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAdmin ? element : <Navigate to="/home" />}
    />
  );
};

export default AdminRoute;
