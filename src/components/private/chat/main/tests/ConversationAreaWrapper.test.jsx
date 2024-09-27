import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConversationAreaWrapper from 'components/private/chat/main/components/ConversationAreaWrapper';
import { useChat, useDispatchChat } from 'providers/chat';
import { useAuth } from 'providers/auth';
import { useSocketData } from 'providers/socket';
import { useDispatchAbsolute } from 'providers/absolute';

// Mock dependencies
jest.mock('providers/chat');
jest.mock('providers/auth');
jest.mock('providers/socket');
jest.mock('providers/absolute');

describe('ConversationAreaWrapper', () => {
    const mockDispatchChat = jest.fn();
    const mockDispatchAbsolute = jest.fn();

    beforeEach(() => {
        useChat.mockReturnValue({
            activeContact: { id: '1', username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            activeMessages: [],
            lastMessageSent: null,
        });
        useAuth.mockReturnValue({
            user: { id: '2' },
        });
        useSocketData.mockReturnValue({
            newMessage: null,
        });
        useDispatchChat.mockReturnValue(mockDispatchChat);
        useDispatchAbsolute.mockReturnValue(mockDispatchAbsolute);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with no messages', () => {
        render(<ConversationAreaWrapper />);
        expect(screen.getByText('No messages found for this contact.')).toBeInTheDocument();
    });

    test('renders correctly with user messages', () => {
        useChat.mockReturnValueOnce({
            activeContact: { id: '1', username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            activeMessages: [
                { id: '1', senderId: '2', text: 'Hello', imageUrl: null, createdAt: '2023-01-01T00:00:00Z' },
            ],
            lastMessageSent: null,
        });
        render(<ConversationAreaWrapper />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    test('renders correctly with contact messages', () => {
        useChat.mockReturnValueOnce({
            activeContact: { id: '1', username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            activeMessages: [
                { id: '1', senderId: '1', text: 'Hi', imageUrl: null, createdAt: '2023-01-01T00:00:00Z' },
            ],
            lastMessageSent: null,
        });
        render(<ConversationAreaWrapper />);
        expect(screen.getByText('Hi')).toBeInTheDocument();
    });

    test('handles new messages correctly', () => {
        useSocketData.mockReturnValueOnce({
            newMessage: { id: '3', senderId: '1', receiverId: '2', text: 'New message', createdAt: '2023-01-01T00:00:00Z' },
        });
        render(<ConversationAreaWrapper />);
        expect(mockDispatchChat).toHaveBeenCalledWith({
            type: 'add/received/new-message',
            newMessage: { id: '3', senderId: '1', receiverId: '2', text: 'New message', createdAt: '2023-01-01T00:00:00Z' },
        });
        expect(mockDispatchChat).toHaveBeenCalledWith({
            type: 'update/contacts/last-message',
            newMessage: { id: '3', senderId: '1', receiverId: '2', text: 'New message', createdAt: '2023-01-01T00:00:00Z', status: 'seen' },
        });
    });

    test('does not dispatch action when activeContact id is falsy', () => {
        useChat.mockReturnValueOnce({
            activeContact: { id: null, username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            activeMessages: [],
            lastMessageSent: null,
        });
        render(<ConversationAreaWrapper />);
        expect(mockDispatchChat).not.toHaveBeenCalledWith({
            type: 'http/get/contact/messages',
            payload: {
                id: null
            }
        });
    });

    test('dispatches notification and updates contact list when new message is received', () => {
        useAuth.mockReturnValueOnce({
            user: { id: '2' },
        });
        useChat.mockReturnValueOnce({
            activeContact: { id: '1', username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            activeMessages: [],
            lastMessageSent: null,
        });
        useSocketData.mockReturnValueOnce({
            newMessage: { id: '3', senderId: '4', receiverId: '2', text: 'New message', createdAt: '2023-01-01T00:00:00Z' },
        });
        render(<ConversationAreaWrapper />);
        expect(mockDispatchAbsolute).toHaveBeenCalledWith({
            type: 'notificationalert/show',
            notificationAlertOptions: {
                type: 'info',
                message: 'New message received'
            }
        });
        expect(mockDispatchChat).toHaveBeenCalledWith({
            type: 'update/contacts/last-message',
            newMessage: { id: '3', senderId: '4', receiverId: '2', text: 'New message', createdAt: '2023-01-01T00:00:00Z' },
        });
    });

    test('renders ContactMessage when senderId is not equal to user id', () => {
        useChat.mockReturnValueOnce({
            activeContact: { id: '1', username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            activeMessages: [
                { id: '1', senderId: '4', text: 'Hello from contact', imageUrl: null, createdAt: '2023-01-01T00:00:00Z' },
            ],
            lastMessageSent: null,
        });
        render(<ConversationAreaWrapper />);
    });

    test.only('calls loadMoreMessages when scrolled to top', () => {
        const { container } = render(<ConversationAreaWrapper />);
        let scrollableDiv = container.querySelector('div');
        scrollableDiv.addEventListener('scroll', () => { /* some callback */ });

        // Simulate scroll event
        fireEvent.scroll(scrollableDiv, {
            target: {
                scrollTop: -1,
                scrollHeight: 100,
                clientHeight: 100,
            },
        });

        expect(mockDispatchChat).toHaveBeenCalledWith({
            type: 'http/get/contact/more-messages',
            payload: {
                id: '1',
                page: 2,
                pageSize: 20,
            },
        });
    });
});