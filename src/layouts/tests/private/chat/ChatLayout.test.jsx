import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatLayout from 'layouts/private/chat/ChatLayout';
import { authStatusFromCookies } from 'providers/auth/AuthActions';
import { useDispatchAuth } from 'providers/auth';
import { socket } from 'utils/socket';

// Mock dependencies
jest.mock('providers/auth/AuthActions', () => ({
  authStatusFromCookies: jest.fn(),
}));
jest.mock('providers/auth', () => ({
  useDispatchAuth: jest.fn(),
}));
jest.mock('utils/socket', () => ({
  socket: {
    on: () => jest.fn(),
    off: () => jest.fn(),
    timeout: jest.fn().mockReturnThis(),
    emit: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
  },
}));

// Mock child components
jest.mock('components/private/chat/left-sidebar/LeftSidebarChatWrapper', () => () => <div data-testid="left-sidebar-chat-wrapper" />);
jest.mock('components/private/chat/main/MainChatWrapper', () => () => <div data-testid="main-chat-wrapper" />);
jest.mock('components/EmojiPickerAbsolute', () => () => <div data-testid="emoji-picker-absolute" />);
jest.mock('components/ImagePreviewDisplayAbsolute', () => () => <div data-testid="image-preview-display-absolute" />);

describe('ChatLayout', () => {
  beforeEach(() => {
    authStatusFromCookies.mockReturnValue({ user: { id: 1, name: 'Test User' }, isAuthenticated: true });
    useDispatchAuth.mockReturnValue(jest.fn());
  });

  test('renders child components correctly', () => {
    render(<ChatLayout />);

    expect(screen.getByTestId('left-sidebar-chat-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('main-chat-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('emoji-picker-absolute')).toBeInTheDocument();
    expect(screen.getByTestId('image-preview-display-absolute')).toBeInTheDocument();
  });

  test('dispatches setup action on mount', () => {
    const dispatch = jest.fn();
    useDispatchAuth.mockReturnValue(dispatch);

    render(<ChatLayout />);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'manual/setup',
      user: { id: 1, name: 'Test User' },
      isAuthenticated: true,
    });
    expect(socket.timeout).toHaveBeenCalledWith(5000);
    expect(socket.emit).toHaveBeenCalledWith('add/onlineUser', { id: 1, name: 'Test User' });
  });

  test('connects and disconnects socket on mount and unmount', () => {
    const { unmount } = render(<ChatLayout />);

    expect(socket.connect).toHaveBeenCalled();

    unmount();

    expect(socket.disconnect).toHaveBeenCalled();
  });
});