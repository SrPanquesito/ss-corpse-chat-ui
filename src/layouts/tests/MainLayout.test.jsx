import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from 'layouts/MainLayout';
import { useSettings, useDispatchSettings } from 'providers/settings';

// Mock dependencies
jest.mock('providers/settings', () => ({
  useSettings: jest.fn(),
  useDispatchSettings: jest.fn(),
}));
jest.mock('providers/absolute', () => ({
  AbsoluteProvider: ({ children }) => <div>{children}</div>,
}));
jest.mock('components/NotificationAlertAbsolute', () => () => <div>MockNotificationAlertAbsolute</div>);
jest.mock('react-router-dom', () => ({
  Outlet: () => <div>MockOutlet</div>,
}));

describe('MainLayout', () => {
  const mockDispatchSettings = jest.fn();

  beforeEach(() => {
    useSettings.mockReturnValue({ darkmode: false });
    useDispatchSettings.mockReturnValue(mockDispatchSettings);
  });

  test('renders MainLayout correctly with dark mode off', () => {
    render(<MainLayout />);

    // Verify main element
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('h-screen');
    expect(mainElement).not.toHaveClass('dark');

    // Verify Outlet
    expect(screen.getByText('MockOutlet')).toBeInTheDocument();

    // Verify NotificationAlertAbsolute
    expect(screen.getByText('MockNotificationAlertAbsolute')).toBeInTheDocument();
  });

  test('renders MainLayout correctly with dark mode on', () => {
    useSettings.mockReturnValue({ darkmode: true });

    render(<MainLayout />);

    // Verify main element
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('h-screen dark');

    // Verify Outlet
    expect(screen.getByText('MockOutlet')).toBeInTheDocument();

    // Verify NotificationAlertAbsolute
    expect(screen.getByText('MockNotificationAlertAbsolute')).toBeInTheDocument();
  });

  test('dispatches dark mode status on mount', () => {
    render(<MainLayout />);

    // Verify dispatchSettings is called
    expect(mockDispatchSettings).toHaveBeenCalledWith({ type: 'darkmode/status' });
  });
});