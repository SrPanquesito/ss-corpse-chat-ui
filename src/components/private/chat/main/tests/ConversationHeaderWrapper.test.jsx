import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConversationHeaderWrapper from 'components/private/chat/main/components/ConversationHeaderWrapper';
import { useChat } from 'providers/chat';
import { useSocketData } from 'providers/socket';
import { useAuth, useDispatchAuth } from 'providers/auth';
import { useDispatchAbsolute } from 'providers/absolute';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

// Mock dependencies
jest.mock('providers/chat');
jest.mock('providers/socket');
jest.mock('providers/auth');
jest.mock('providers/absolute');
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));
jest.mock('components/ButtonDarkmode', () => () => <div>ButtonDarkmode</div>);

describe('ConversationHeaderWrapper', () => {
    const mockNavigate = jest.fn();
    const mockDispatchAuth = jest.fn();
    const mockDispatchAbsolute = jest.fn();

    beforeEach(() => {
        useChat.mockReturnValue({
            activeContact: { id: '1', username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            error: null,
        });
        useSocketData.mockReturnValue({
            onlineUsers: [{ id: '1' }],
        });
        useAuth.mockReturnValue({
            user: { id: '1' },
        });
        useDispatchAuth.mockReturnValue(mockDispatchAuth);
        useDispatchAbsolute.mockReturnValue(mockDispatchAbsolute);
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<ConversationHeaderWrapper />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Online')).toBeInTheDocument();
    });

    test('renders correctly without activeContact username nor profile picture', () => {
        useChat.mockReturnValue({
            activeContact: { id: '1', username: '', profilePictureUrl: null },
        });
        render(<ConversationHeaderWrapper />);
        expect(screen.getByText('Online')).toBeInTheDocument();
    });

    test('displays offline status when user is not online', () => {
        useSocketData.mockReturnValueOnce({
            onlineUsers: [],
        });
        render(<ConversationHeaderWrapper />);
        expect(screen.getByText('Offline')).toBeInTheDocument();
    });
    
    test('displays offline status when user is not online', () => {
        useChat.mockReturnValue({
            activeContact: null,
        });
        useSocketData.mockReturnValue({
            onlineUsers: [],
        });
        render(<ConversationHeaderWrapper />);
        expect(screen.getByText('Offline')).toBeInTheDocument();
    });

    test('logout button works correctly', () => {
        render(<ConversationHeaderWrapper />);
        const logoutButton = screen.getByText('Log-out');
        fireEvent.click(logoutButton);
        expect(mockDispatchAuth).toHaveBeenCalledWith({ type: 'auth/logout' });
        expect(mockDispatchAbsolute).toHaveBeenCalledWith({
            type: 'notificationalert/show',
            notificationAlertOptions: {
                type: 'warning',
                message: 'Logged out successfully',
            },
        });
        expect(mockDispatchAbsolute).toHaveBeenCalledWith({ type: 'cleanup' });
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN_ROUTE, { replace: true });
    });

    test('displays error notification when chat error occurs', () => {
        const errorResponse = {
            response: {
                data: 'An error occurred',
                status: 500,
            },
        };
        useChat.mockReturnValueOnce({
            activeContact: { id: '1', username: 'John Doe', profilePictureUrl: 'profile.jpg' },
            error: errorResponse,
        });
        render(<ConversationHeaderWrapper />);
        expect(mockDispatchAbsolute).toHaveBeenCalledWith({
            type: 'notificationalert/show',
            notificationAlertOptions: {
                type: 'error',
                message: 'An error occurred',
            },
        });
    });
});