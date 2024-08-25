import React from 'react';
import { render, screen } from '@testing-library/react';
import LoggedUserHeaderWrapper from 'components/private/chat/left-sidebar/components/LoggedUserHeaderWrapper';
import { useAuth } from 'providers/auth';
import logo from 'assets/images/logo.png';

jest.mock('providers/auth');

describe('LoggedUserHeaderWrapper', () => {
  const mockUser = {
    username: 'TestUser',
    profilePictureUrl: 'http://example.com/profile.jpg',
  };

  beforeEach(() => {
    useAuth.mockReturnValue({ user: mockUser });
  });

  test('renders welcome message and profile picture', () => {
    render(<LoggedUserHeaderWrapper />);

    // Check welcome message
    expect(screen.getByText(`Hi, ${mockUser.username}`)).toBeInTheDocument();

    // Check profile picture
    const profilePictureDiv = screen.getAllByRole('img')[0];
    expect(profilePictureDiv).toHaveStyle(`background-image: url(${mockUser.profilePictureUrl})`);
  });

  test('renders default profile picture when user profile picture is not provided', () => {
    useAuth.mockReturnValue({ user: { ...mockUser, profilePictureUrl: null } });
    render(<LoggedUserHeaderWrapper />);

    // Check profile picture
    const profilePictureDiv = screen.getAllByRole('img')[0];
    expect(profilePictureDiv).toHaveStyle(`background-image: url(${logo})`);
  });
});