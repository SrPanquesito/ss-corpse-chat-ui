import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authStatusFromCookies } from 'providers/auth/AuthActions';
import { ROUTES } from 'utils/constants';

const ProtectedPublicRoute = () => {
  const { isAuthenticated } = authStatusFromCookies();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.CHAT_ROUTE} replace />;
  }
  return <Outlet />;
};

export default ProtectedPublicRoute;