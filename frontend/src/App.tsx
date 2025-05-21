import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/create-software"
        element={
          <ProtectedRoute role="Admin">
            <CreateSoftware />
          </ProtectedRoute>
        }
      />
      <Route
        path="/request-access"
        element={
          <ProtectedRoute role="Employee">
            <RequestAccess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pending-requests"
        element={
          <ProtectedRoute role="Manager">
            <PendingRequests />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
