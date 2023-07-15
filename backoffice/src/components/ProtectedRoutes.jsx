import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './nav/Sidebar';
import { useAuth } from '../hooks/auth';

export default function ProtectedRoute({ el: Element, requireAdmin }) {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col ">
      <div className="flex">
        <Sidebar />
        <div className="w-full item-center">
          <Element />
        </div>
      </div>
    </div>
  );
}
