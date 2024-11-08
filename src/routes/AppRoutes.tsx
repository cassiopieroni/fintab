import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Login from '../pages/Login';
import { AuthProvider } from '../providers/AuthProvider';
import { useAuth } from '../hooks/auth/useAuth';
import Layout from '../components/common/Layout';
import { Roles } from '../interfaces/auth/Roles';
import Admin from '../pages/Admin';
import Unauthorized from '../pages/Unauthorized';

const PrivateRoute: React.FC<{ roles?: Roles[] }> = ({ roles }) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />

          <Route path="/login" element={<Layout><Login /></Layout>} />

          <Route path="/unauthorized" element={<Layout><Unauthorized /></Layout>} />

          <Route element={<PrivateRoute />}>
            <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
          </Route>

          <Route element={<PrivateRoute roles={[Roles.ADMIN]} />}>
            <Route path="/admin" element={<Layout><Admin /></Layout>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
