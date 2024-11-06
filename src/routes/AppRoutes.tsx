import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Login from '../pages/Login';
import { AuthProvider } from '../providers/AuthProvider';
import { useAuth } from '../hooks/auth/useAuth';
import Layout from '../components/common/Layout';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />

          <Route path="/login" element={<Layout><Login /></Layout>} />

          <Route element={<PrivateRoute />}>
            <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
