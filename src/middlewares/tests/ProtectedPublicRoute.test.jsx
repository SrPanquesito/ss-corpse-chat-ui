import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedPublicRoute from 'middlewares/ProtectedPublicRoute';
import { authStatusFromCookies } from 'providers/auth/AuthActions';

// Mock dependencies
jest.mock('providers/auth/AuthActions', () => ({
  authStatusFromCookies: jest.fn(),
}));
jest.mock('utils/constants', () => ({
  ROUTES: {
    CHAT_ROUTE: '/chat',
  },
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Outlet: () => <div>MockOutlet</div>,
}));

describe('ProtectedPublicRoute', () => {
  test('navigates to chat route when authenticated', () => {
    authStatusFromCookies.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <ProtectedPublicRoute />
      </MemoryRouter>
    );

    // Verify navigation to chat route
    expect(screen.queryByText('MockOutlet')).not.toBeInTheDocument();
  });

  test('renders Outlet when not authenticated', () => {
    authStatusFromCookies.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter>
        <ProtectedPublicRoute />
      </MemoryRouter>
    );

    // Verify Outlet is rendered
    expect(screen.getByText('MockOutlet')).toBeInTheDocument();
  });
});