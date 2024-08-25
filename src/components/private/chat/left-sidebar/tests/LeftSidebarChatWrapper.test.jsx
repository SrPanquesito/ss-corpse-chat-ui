import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LeftSidebarChatWrapper from 'components/private/chat/left-sidebar/LeftSidebarChatWrapper';
import { useChat, useDispatchChat } from 'providers/chat';
import { useAuth } from 'providers/auth';
import { useSocketData } from 'providers/socket';

// Mock the useChat and useDispatchChat hooks
jest.mock('providers/chat', () => ({
    useChat: jest.fn(),
    useDispatchChat: jest.fn(),
}));
jest.mock('providers/auth');
jest.mock('providers/socket');
jest.mock('components/private/chat/left-sidebar/components/ContactCard', () => jest.fn(() => <div>ContactCard</div>));

describe('LeftSidebarChatWrapper', () => {
    const mockDispatchChat = jest.fn();
    const mockChat = {
        allContacts: [
            { id: 1, username: 'john_doe', profilePictureUrl: '', lastMessage: '' },
            { id: 2, username: 'jane_doe', profilePictureUrl: '', lastMessage: '' },
        ],
        contacts: [],
        activeContact: null,
    };
    const mockUser = {
        username: 'TestUser',
        profilePictureUrl: 'http://example.com/profile.jpg',
    };

    beforeEach(() => {
        useChat.mockReturnValue(mockChat);
        useDispatchChat.mockReturnValue(mockDispatchChat);
        useAuth.mockReturnValue({ user: mockUser });
        useSocketData.mockReturnValue({ newOnlineUser: null });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders LeftSidebarChatWrapper and performs search', () => {
        render(<LeftSidebarChatWrapper />);

        // Check if the components are rendered
        expect(screen.getByPlaceholderText('Search for contacts...')).toBeInTheDocument();

        // Simulate typing in the search input
        fireEvent.change(screen.getByPlaceholderText('Search for contacts...'), {
            target: { value: 'john' },
        });

        // Check if the searchText state is updated and dispatch is called
        expect(screen.getByDisplayValue('john')).toBeInTheDocument();
        expect(mockDispatchChat).toHaveBeenCalledWith({
            type: 'update/contacts',
            contacts: [{ id: 1, username: 'john_doe', profilePictureUrl: '', lastMessage: '' }],
        });

        // Simulate typing in the search input with no matching contacts
        fireEvent.change(screen.getByPlaceholderText('Search for contacts...'), {
            target: { value: 'nonexistent' },
        });

        // Check if the searchText state is updated and dispatch is called with empty array
        expect(screen.getByDisplayValue('nonexistent')).toBeInTheDocument();
        expect(mockDispatchChat).toHaveBeenCalledWith({
            type: 'update/contacts',
            contacts: [],
        });
    });
});