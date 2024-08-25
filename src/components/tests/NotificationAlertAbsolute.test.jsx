import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationAlertAbsolute from 'components/NotificationAlertAbsolute';
import { useAbsolute, useDispatchAbsolute } from 'providers/absolute';

// Mock the useAbsolute and useDispatchAbsolute hooks
jest.mock('providers/absolute', () => ({
  useAbsolute: jest.fn(),
  useDispatchAbsolute: jest.fn(),
}));

describe('NotificationAlertAbsolute', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatchAbsolute.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders notification alert with success type', () => {
    useAbsolute.mockReturnValue({
      showNotificationAlert: true,
      notificationAlertOptions: {
        type: 'success',
        message: 'Operation was successful',
        timeout: 3000,
      },
    });

    render(<NotificationAlertAbsolute />);

    expect(screen.getByText('Success:')).toBeInTheDocument();
    expect(screen.getByText('Operation was successful')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog')).toHaveClass('bg-green-500 text-green-100');
  });

  test('renders notification alert but remains hidden when showNotificationAlert is false', () => {
    useAbsolute.mockReturnValue({
      showNotificationAlert: false,
      notificationAlertOptions: {
        type: 'info',
        message: 'This is an info message',
        timeout: 3000,
      },
    });

    render(<NotificationAlertAbsolute />);

    expect(screen.queryByRole('alertdialog')).toBeInTheDocument();
  });

  test('renders notification alert with error type', () => {
    useAbsolute.mockReturnValue({
      showNotificationAlert: true,
      notificationAlertOptions: {
        type: 'error',
        message: 'An error occurred',
        timeout: 3000,
      },
    });

    render(<NotificationAlertAbsolute />);

    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog')).toHaveClass('bg-red-500 text-red-100');
  });

  test('renders notification alert with warning type', () => {
    useAbsolute.mockReturnValue({
      showNotificationAlert: true,
      notificationAlertOptions: {
        type: 'warning',
        message: 'This is a warning',
        timeout: 3000,
      },
    });

    render(<NotificationAlertAbsolute />);

    expect(screen.getByText('Warning:')).toBeInTheDocument();
    expect(screen.getByText('This is a warning')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog')).toHaveClass('bg-yellow-500 text-yellow-100');
  });

  test('renders notification alert with info type', () => {
    useAbsolute.mockReturnValue({
      showNotificationAlert: true,
      notificationAlertOptions: {
        type: 'info',
        message: 'This is an info message',
        timeout: 3000,
      },
    });

    render(<NotificationAlertAbsolute />);

    expect(screen.getByText('Info:')).toBeInTheDocument();
    expect(screen.getByText('This is an info message')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog')).toHaveClass('bg-blue-500 text-blue-100');
  });

  test('hides notification alert after timeout', () => {
    jest.useFakeTimers();

    useAbsolute.mockReturnValue({
      showNotificationAlert: true,
      notificationAlertOptions: {
        type: 'info',
        message: 'This is an info message',
        timeout: 3000,
      },
    });

    render(<NotificationAlertAbsolute />);

    expect(screen.getByText('Info:')).toBeInTheDocument();

    jest.advanceTimersByTime(3000);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'notificationalert/hide' });

    jest.useRealTimers();
  });
});