import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from 'layouts/public/auth/login/Login';
import { useDispatchAuth, useAuth } from 'providers/auth/AuthProvider';
import { useDispatchAbsolute } from 'providers/absolute/AbsoluteProvider';
import { ROUTES } from 'utils/constants';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('providers/auth/AuthProvider', () => ({
  useDispatchAuth: jest.fn(),
  useAuth: jest.fn(),
}));
jest.mock('providers/absolute/AbsoluteProvider', () => ({
  useDispatchAbsolute: jest.fn(),
}));
jest.useFakeTimers();

describe('Login', () => {
  const mockNavigate = jest.fn();
  const mockDispatchAuth = jest.fn();
  const mockDispatchAbsolute = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    useDispatchAuth.mockReturnValue(mockDispatchAuth);
    useDispatchAbsolute.mockReturnValue(mockDispatchAbsolute);
    useAuth.mockReturnValue({
      user: null,
      error: null,
      isAuthenticated: false,
    });
  });

  test('renders login form correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Log in/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Don't have any account\? Sign up here/i)).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits form correctly', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    // First element is the text to show the user, second is the button
    const submitButton = screen.getAllByText(/Log in/i)[1];

    await act(async () => {
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockDispatchAuth).toHaveBeenCalledWith({
        type: 'http/auth/login',
        data: expect.any(FormData),
      });
    });

    const formData = mockDispatchAuth.mock.calls[0][0].data;
    expect(formData.get('email')).toBe('test@example.com');
    expect(formData.get('password')).toBe('password123');
  });

  test('shows success notification and navigates on successful login', async () => {
    useAuth.mockReturnValue({
      user: { id: 1, name: 'Test User' },
      error: null,
      isAuthenticated: true,
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    await waitFor(() => {
      expect(mockDispatchAbsolute).toHaveBeenCalledWith({
        type: 'notificationalert/show',
        notificationAlertOptions: {
          type: 'success',
          message: 'Logged in successfully',
        },
      });
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CHAT_ROUTE);
    });
  });

  test('shows error notification on login failure', async () => {
    useAuth.mockReturnValue({
      user: null,
      error: { response: { data: 'Invalid credentials', status: 400 } },
      isAuthenticated: false,
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    await waitFor(() => {
      expect(mockDispatchAbsolute).toHaveBeenCalledWith({
        type: 'notificationalert/show',
        notificationAlertOptions: {
          type: 'error',
          message: 'Invalid credentials',
        },
      });
    });
  });
});