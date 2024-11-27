import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Login from '../pages/Login';
import { useAuth } from '../hooks/auth/useAuth';
import Layout from '../components/common/Layout';
import { Roles } from '../interfaces/auth/Roles';
import Admin from '../pages/Admin';
import Unauthorized from '../pages/Unauthorized';
import { AplicationRoutes } from './routes.enum';

const PrivateRoute: React.FC<{ roles?: Roles[] }> = ({ roles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={AplicationRoutes.LOGIN} />;
  }

  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to={AplicationRoutes.UNAUTHORIZED} />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <Router basename='/fintab'>
      <Routes>
        <Route path={AplicationRoutes.HOME} element={<Layout><Home /></Layout>} />

        <Route path={AplicationRoutes.LOGIN} element={<Layout><Login /></Layout>} />

        <Route path={AplicationRoutes.UNAUTHORIZED} element={<Layout><Unauthorized /></Layout>} />

        <Route element={<PrivateRoute />}>
          <Route path={AplicationRoutes.TRANSACTIONS} element={<Layout><Transactions /></Layout>} />
        </Route>

        <Route element={<PrivateRoute roles={[Roles.ADMIN]} />}>
          <Route path={AplicationRoutes.ADMIN} element={<Layout><Admin /></Layout>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
