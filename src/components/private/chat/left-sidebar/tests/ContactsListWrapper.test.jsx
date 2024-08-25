import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactsListWrapper from 'components/private/chat/left-sidebar/components/ContactsListWrapper';
import { useChat, useDispatchChat } from 'providers/chat';
import { useSocketData } from 'providers/socket';
import { useAuth } from 'providers/auth';

jest.mock('providers/chat');
jest.mock('providers/socket');
jest.mock('providers/auth');

describe('ContactsListWrapper', () => {
  const mockDispatchChat = jest.fn();
  const mockChat = {
    contacts: [
      { id: '1', username: 'User1', profilePictureUrl: '', lastMessage: { text: 'Hello', createdAt: '2023-01-01T00:00:00Z' } },
      { id: '2', username: 'User2', profilePictureUrl: '', lastMessage: { text: 'Hi', createdAt: '2023-01-02T00:00:00Z' } },
    ],
    activeContact: null,
    error: null,
    retrievedInitialContacts: false,
  };
  const mockSocketData = {
    newOnlineUser: null,
    onlineUsers: [{ id: 'user2' }],
  };
  const mockAuth = {
    user: { id: 'user1' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useChat.mockReturnValue(mockChat);
    useDispatchChat.mockReturnValue(mockDispatchChat);
    useSocketData.mockReturnValue(mockSocketData);
    useAuth.mockReturnValue(mockAuth);
  });

  test('renders ContactsListWrapper component with contacts', () => {
    const {container} = render(<ContactsListWrapper />);

    expect(container.getElementsByClassName('flex items-center w-full relative').length).toBe(2);
  });

  test('dispatches get contacts action if no contacts are retrieved initially', () => {
    useChat.mockReturnValue({ contacts: [] });
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).toHaveBeenCalledWith({ type: 'http/get/contacts' });
  });

  test('dispatches set active contact action if contacts are available but no active contact is set', () => {
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).toHaveBeenCalledWith({ type: 'set/activeContact', activeContact: mockChat.contacts[0] });
  });

  test('renders "No contacts found" message when there are no contacts', () => {
    useChat.mockReturnValue({ ...mockChat, contacts: [] });
    render(<ContactsListWrapper />);

    expect(screen.getByText('No contacts found.')).toBeInTheDocument();
  });

  test('onContactClick dispatches set active contact action with correct contact', () => {
    render(<ContactsListWrapper />);

    // Find the first ContactCard and simulate a click
    const contactElement = screen.getByTestId(`contact-button-${mockChat.contacts[0].id}`);
    fireEvent.click(contactElement);

    expect(mockDispatchChat).toHaveBeenCalledWith({ type: 'set/activeContact', activeContact: mockChat.contacts[0] });
  });

  test('dispatches get contacts action when a new online user is detected', () => {
    useSocketData.mockReturnValue({ ...mockSocketData, newOnlineUser: { id: '3' } });
    useChat.mockReturnValue({ ...mockChat, allContacts: mockChat.contacts });
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).toHaveBeenCalledWith({ type: 'http/get/contacts' });
  });
});