import React from 'react';
import {
    createBrowserRouter,
    redirect
  } from 'react-router-dom';
import Login from 'layouts/public/auth/login/Login'
import Register from 'layouts/public/auth/register/Register';
import MainLayout from 'layouts/MainLayout';
import AuthLayout from 'layouts/public/auth/AuthLayout';
import ChatLayout from 'layouts/private/chat/ChatLayout';
import ProtectedPrivateRoute from 'middlewares/ProtectedPrivateRoute';
import ProtectedPublicRoute from 'middlewares/ProtectedPublicRoute';
import { ROUTES } from 'utils/constants';

const RouterConfig = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          loader: () => redirect(ROUTES.CHAT_ROUTE)
        },
        {
          path: 'auth',
          element: <ProtectedPublicRoute />,
          children: [
            {
              index: true,
              loader: () => redirect(ROUTES.LOGIN_ROUTE)
            },
            {
              path: 'register',
              element: <AuthLayout><Register /></AuthLayout>
            },
            {
              path: 'login',
              element: <AuthLayout><Login /></AuthLayout>
            }
          ]
        },
        {
          path: 'chat',
          element: <ProtectedPrivateRoute />,
          children: [
            {
              index: true,
              element: <ChatLayout />
            }
          ]
        }
      ]
    },
    {
      path: '*',
      loader: () => redirect(ROUTES.CHAT_ROUTE)
    }
]);

export default RouterConfig;