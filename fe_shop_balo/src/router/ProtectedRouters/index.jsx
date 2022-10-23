// Check login authentication

import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLogin } from '../../adapter/auth';
// import { checkLogin } from '../../api/Auth';

export function ProtectedRoutes(props) {
  const isAuthenticate = checkLogin();
  return isAuthenticate ? <Outlet /> : <Navigate to="admin/login" />;
}
