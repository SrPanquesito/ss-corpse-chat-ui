import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthLayout from 'layouts/public/auth/AuthLayout';

// Mock dependencies
jest.mock('components/ButtonDarkmode', () => () => <div>MockButtonDarkmode</div>);
jest.mock('assets/images/logo.png', () => 'mock-logo.png');

describe('AuthLayout', () => {
  test('renders AuthLayout correctly', () => {
    render(
      <AuthLayout>
        <div>Test Children</div>
      </AuthLayout>
    );

    // Verify dark mode button
    expect(screen.getByText('MockButtonDarkmode')).toBeInTheDocument();

    // Verify logo
    const logoImg = screen.getByAltText('');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'mock-logo.png');

    // Verify welcome message
    expect(screen.getByText('Welcome to Corpse Chat')).toBeInTheDocument();
    expect(screen.getByText('Your edgy online space.')).toBeInTheDocument();

    // Verify children
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});