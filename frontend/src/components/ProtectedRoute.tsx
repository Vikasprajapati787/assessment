import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  role: 'Employee' | 'Manager' | 'Admin';
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token || userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
