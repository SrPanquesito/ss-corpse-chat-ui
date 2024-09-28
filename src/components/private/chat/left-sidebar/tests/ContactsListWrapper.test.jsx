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
    allContacts: [
      { id: '1', username: 'User1', profilePictureUrl: '', lastMessage: { text: 'Hello', createdAt: '2023-01-01T00:00:00Z' } },
      { id: '2', username: 'User2', profilePictureUrl: '', lastMessage: { text: 'Hi', createdAt: '2023-01-02T00:00:00Z' } },
    ],
    activeContact: null,
    error: null,
    retrievedInitialContacts: false,
    paginationContacts: {
      currentPage: 1,
      totalPages: 3,
      pageSize: 20,
    },
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

  test('fetches initial contacts on mount', () => {
    useChat.mockReturnValue({ ...mockChat, contacts: [] });
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).toHaveBeenCalledWith({
      type: 'http/get/contacts',
      payload: {
        page: 1,
        pageSize: 20,
      },
    });
  });

  test('adds new online user to contacts list', () => {
    useSocketData.mockReturnValueOnce({
      newOnlineUser: { id: '3', username: 'New User' },
    });
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).toHaveBeenCalledWith({
      type: 'http/get/contact',
      payload: {
        id: '3',
      },
    });
  });

  test('do not add new online user to contacts list', () => {
    useSocketData.mockReturnValueOnce({
      newOnlineUser: { id: '2', username: 'New User already exist in allContacts' },
    });
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).not.toHaveBeenCalled();
  });

  test('updates contacts list when new contacts are fetched', () => {
    useChat.mockReturnValueOnce({
      ...mockChat,
      retrievedInitialContacts: true,
    });
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).toHaveBeenCalledWith({
      type: 'update/contacts',
      contacts: mockChat.allContacts,
    });
  });

  test('sets active contact when there are contacts available and no active contact', () => {
    useChat.mockReturnValueOnce({
      ...mockChat,
      retrievedInitialContacts: true,
    });
    render(<ContactsListWrapper />);

    expect(mockDispatchChat).toHaveBeenCalledWith({
      type: 'set/activeContact',
      activeContact: mockChat.allContacts[0],
    });
  });

  test('renders ContactsListWrapper component with contacts', () => {
    const { container } = render(<ContactsListWrapper />);
    expect(container.getElementsByClassName('flex items-center w-full relative').length).toBe(2);
  });

  test('renders "No contacts found" message when there are no contacts', () => {
    useChat.mockReturnValue({ ...mockChat, contacts: [] });
    render(<ContactsListWrapper />);
    expect(screen.getByText('No contacts found.')).toBeInTheDocument();
  });

  test('onContactClick dispatches set active contact action with correct contact', () => {
    render(<ContactsListWrapper />);
    const contactElement = screen.getByText('User1');
    fireEvent.click(contactElement);

    expect(mockDispatchChat).toHaveBeenCalledWith({ type: 'set/activeContact', activeContact: mockChat.contacts[0] });
  });

  test('calls loadMoreContacts when scrolled to bottom', () => {
    render(<ContactsListWrapper />);
    let scrollableDiv = screen.getByTestId('contacts-list-wrapper');
    scrollableDiv.addEventListener('scroll', () => {});

    // Mock the properties of the scrollable div
    Object.defineProperty(scrollableDiv, 'scrollTop', { value: 600, writable: true });
    Object.defineProperty(scrollableDiv, 'scrollHeight', { value: 200, writable: true });
    Object.defineProperty(scrollableDiv, 'clientHeight', { value: 0, writable: true });
    fireEvent.scroll(scrollableDiv);

    expect(mockDispatchChat).toHaveBeenCalledWith({
        type: 'http/get/more-contacts',
        payload: {
            page: 2,
            pageSize: 20,
        },
    });
  });

  test('do not call loadMoreContacts if scroll has not reached bottom', () => {
    render(<ContactsListWrapper />);
    let scrollableDiv = screen.getByTestId('contacts-list-wrapper');
    scrollableDiv.addEventListener('scroll', () => {});

    // Mock the properties of the scrollable div
    Object.defineProperty(scrollableDiv, 'scrollTop', { value: 100, writable: true });
    Object.defineProperty(scrollableDiv, 'scrollHeight', { value: 1000, writable: true });
    Object.defineProperty(scrollableDiv, 'clientHeight', { value: 0, writable: true });
    fireEvent.scroll(scrollableDiv);

    expect(mockDispatchChat).not.toHaveBeenCalled();
  });
});