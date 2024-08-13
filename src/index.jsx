import React from 'react'
import { createRoot } from 'react-dom/client';
import {
  RouterProvider
} from 'react-router-dom';
import './index.css';

import { SettingsProvider } from 'providers/settings/SettingsProvider';
import { AuthProvider } from 'providers/auth/AuthProvider';
import RouterConfig from './RouterConfig';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <AuthProvider>
        <RouterProvider router={RouterConfig} />
      </AuthProvider>
    </SettingsProvider>
  </React.StrictMode>,
)
