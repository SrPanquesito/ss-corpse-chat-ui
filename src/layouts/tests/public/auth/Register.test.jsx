import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from 'layouts/public/auth/register/Register';
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

describe('Register', () => {
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

  test('renders register form correctly', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i)[1]).toBeInTheDocument();
    expect(screen.getByLabelText(/profile picture/i)).toBeInTheDocument();
    expect(screen.getAllByText(/register/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/login to your account/i)).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getAllByLabelText(/password/i)[0];
    const confirmPasswordInput = screen.getAllByLabelText(/password/i)[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  test('handles file input correctly', () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const fileInput = screen.getByLabelText(/profile picture/i);
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
  });

  test('submits form correctly', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getAllByLabelText(/password/i)[0];
    const confirmPasswordInput = screen.getAllByLabelText(/password/i)[1];
    const fileInput = screen.getByLabelText(/profile picture/i);
    // First one is the text link, second one is the button
    const submitButton = screen.getAllByText(/register/i)[1];

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatchAuth).toHaveBeenCalledWith({
        type: 'http/auth/register',
        data: expect.any(FormData),
      });
    });

    const formData = mockDispatchAuth.mock.calls[0][0].data;
    expect(formData.get('username')).toBe('testuser');
    expect(formData.get('email')).toBe('test@example.com');
    expect(formData.get('password')).toBe('password123');
    expect(formData.get('confirmPassword')).toBe('password123');
    expect(formData.get('file')).toBe(file);
  });

  test('submits form correctly without file', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getAllByLabelText(/password/i)[0];
    const confirmPasswordInput = screen.getAllByLabelText(/password/i)[1];
    const fileInput = screen.getByLabelText(/profile picture/i);
    // First one is the text link, second one is the button
    const submitButton = screen.getAllByText(/register/i)[1];

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.change(fileInput, { target: { files: [] } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatchAuth).toHaveBeenCalledWith({
        type: 'http/auth/register',
        data: expect.any(FormData),
      });
    });

    const formData = mockDispatchAuth.mock.calls[0][0].data;
    expect(formData.get('username')).toBe('testuser');
    expect(formData.get('email')).toBe('test@example.com');
    expect(formData.get('password')).toBe('password123');
    expect(formData.get('confirmPassword')).toBe('password123');
  });

  test('shows success notification and navigates on successful registration', async () => {
    useAuth.mockReturnValue({
      user: { id: 1, name: 'Test User' },
      error: null,
      isAuthenticated: true,
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    await waitFor(() => {
      expect(mockDispatchAbsolute).toHaveBeenCalledWith({
        type: 'notificationalert/show',
        notificationAlertOptions: {
          type: 'success',
          message: 'Registration successful',
        },
      });
    });

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(ROUTES.CHAT_ROUTE);
    });
  });

  test('shows error notification on registration failure', async () => {
    useAuth.mockReturnValue({
      user: null,
      error: { message: 'Registration failed' },
      isAuthenticated: false,
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    await waitFor(() => {
      expect(mockDispatchAbsolute).toHaveBeenCalledWith({
        type: 'notificationalert/show',
        notificationAlertOptions: {
          type: 'error',
          message: 'Registration failed',
        },
      });
    });
  });
});