import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedPrivateRoute from 'middlewares/ProtectedPrivateRoute';
import { authStatusFromCookies } from 'providers/auth/AuthActions';

// Mock dependencies
jest.mock('providers/auth/AuthActions', () => ({
  authStatusFromCookies: jest.fn(),
}));
jest.mock('utils/constants', () => ({
  ROUTES: {
    LOGIN_ROUTE: '/login',
  },
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Outlet: () => <div>MockOutlet</div>,
}));

describe('ProtectedPrivateRoute', () => {
  test('navigates to login route when not authenticated', () => {
    authStatusFromCookies.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter>
        <ProtectedPrivateRoute />
      </MemoryRouter>
    );

    // Verify navigation to login route
    expect(screen.queryByText('MockOutlet')).not.toBeInTheDocument();
  });

  test('renders Outlet when authenticated', () => {
    authStatusFromCookies.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <ProtectedPrivateRoute />
      </MemoryRouter>
    );

    // Verify Outlet is rendered
    expect(screen.getByText('MockOutlet')).toBeInTheDocument();
  });
});