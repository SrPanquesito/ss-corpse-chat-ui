import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactCard from 'components/private/chat/left-sidebar/components/ContactCard';
import { useAuth } from 'providers/auth';
import { useSocketData } from 'providers/socket';
import moment from 'moment';

jest.mock('providers/auth');
jest.mock('providers/socket');

describe('ContactCard', () => {
  const mockOnClick = jest.fn();
  const mockAuth = {
    user: { id: 'user1' },
  };
  const mockSocketData = {
    onlineUsers: [{ id: 'user2' }],
  };

  const setup = (props = {}) => {
    const defaultProps = {
      id: 'user2',
      username: 'John Doe',
      profilePictureUrl: '',
      onClick: mockOnClick,
      activeContactId: 'user2',
      lastMessage: {
        text: 'Hello',
        imageUrl: '',
        status: 'unseen',
        createdAt: moment().subtract(1, 'hour').toISOString(),
        senderId: 'user1',
      },
    };
    return render(<ContactCard {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue(mockAuth);
    useSocketData.mockReturnValue(mockSocketData);
  });

  test('renders ContactCard with lastMessage properties text and image', async () => {
    const mockContact = {
      id: '1',
      username: 'User1',
      profilePictureUrl: '',
      onClick: mockOnClick,
      lastMessage: {
        text: 'Hello',
        imageUrl: 'image.jpg',
        status: 'sent',
        createdAt: '2023-01-01T00:00:00Z',
        senderId: '2'
      }
    };
    render(<ContactCard {...mockContact} />);

    expect(screen.getByText('User1 sent an image')).toBeInTheDocument();
    expect(screen.getByText('2 years ago')).toBeInTheDocument();
  });

  test('renders ContactCard with lastMessage properties - image sent by logged user', async () => {
    const mockContact = {
      id: '1',
      username: 'User1',
      profilePictureUrl: '',
      onClick: mockOnClick,
      lastMessage: {
        text: '',
        imageUrl: 'image.jpg',
        status: 'sent',
        createdAt: '2023-01-01T00:00:00Z',
        senderId: 'user1'
      }
    };
    render(<ContactCard {...mockContact} />);

    expect(screen.getByText('You sent an image')).toBeInTheDocument();
    expect(screen.getByText('2 years ago')).toBeInTheDocument();
  });

  test('renders ContactCard with lastMessage properties only text', async () => {
    const mockContact = {
      id: '1',
      username: 'User1',
      profilePictureUrl: '',
      onClick: mockOnClick,
      lastMessage: {
        text: 'Hello',
        imageUrl: '',
        status: 'sent',
        createdAt: '2021-01-01T00:00:00Z',
        senderId: '2'
      }
    };
    render(<ContactCard {...mockContact} />);

    expect(screen.getByText('User1 sent a message')).toBeInTheDocument();
    expect(screen.getByText('4 years ago')).toBeInTheDocument();
  });

  test('renders ContactCard with default values when lastMessage is null', () => {
    const mockContact = {
      id: '1',
      username: 'User1',
      profilePictureUrl: '',
      onClick: mockOnClick,
      lastMessage: null
    };
    render(<ContactCard {...mockContact} />);

    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('No messages')).toBeInTheDocument();
  });

  test('renders profile picture with default logo when profilePictureUrl is not provided', () => {
    setup();

    const profilePictureElement = screen.getByRole('img');
    expect(profilePictureElement).toHaveStyle(`background-image: url(${require('assets/images/logo.png')})`);
  });

  test('renders profile picture with provided profilePictureUrl', () => {
    setup({ profilePictureUrl: 'http://example.com/profile.jpg' });

    const profilePictureElement = screen.getByRole('img');
    expect(profilePictureElement).toHaveStyle('background-image: url(http://example.com/profile.jpg)');
  });

  test('calls onClick handler when ContactCard is clicked', () => {
    setup();

    const contactCardElement = screen.getByRole('button');
    fireEvent.click(contactCardElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders online status indicator when user is online', () => {
    setup();

    const onlineIndicatorElement = screen.getByRole('status');
    expect(onlineIndicatorElement).toBeInTheDocument();
    expect(onlineIndicatorElement).toHaveClass('bg-green-500');
  });

  test('renders last message text correctly', () => {
    setup();

    const lastMessageElement = screen.getByText('You sent a message');
    expect(lastMessageElement).toBeInTheDocument();
  });

  test('renders last message timestamp correctly', () => {
    setup();

    const timestampElement = screen.getByText('•');
    expect(timestampElement).toBeInTheDocument();
    const timeAgoElement = screen.getByText('an hour ago');
    expect(timeAgoElement).toBeInTheDocument();
  });

  test('applies correct classes when contact is active', () => {
    setup();

    const contactCardElement = screen.getByRole('button');
    expect(contactCardElement).toHaveClass('border-l-4 border-sky-500 bg-slate-200 dark:bg-slate-700');
  });

  test('applies correct classes when message is unseen', () => {
    setup();

    const contactCardElement = screen.getByRole('button');
    expect(contactCardElement).toHaveClass('bg-blue-200 dark:bg-slate-900');
  });
});