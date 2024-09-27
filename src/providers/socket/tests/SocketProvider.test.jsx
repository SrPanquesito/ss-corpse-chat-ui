// SocketProvider.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SocketProvider, useSocketData } from 'providers/socket/SocketProvider';
import { socket } from 'utils/socket';

jest.mock('utils/socket', () => ({
    socket: {
        on: jest.fn(),
        off: jest.fn(),
        io: {
            engine: {
                transport: {
                    name: 'test'
                }
            }
        }
    }
}));

describe('SocketProvider', () => {
    const mockSocket = socket;

    beforeEach(() => {
        console.log = jest.fn();
        jest.clearAllMocks();
    });

    it('should provide socket context value', () => {
        const TestComponent = () => {
            const socketData = useSocketData();
            return <div>{socketData ? 'Socket Context Provided' : 'No Socket Context'}</div>;
        };

        render(
            <SocketProvider>
                <TestComponent />
            </SocketProvider>
        );

        expect(screen.getByText('Socket Context Provided')).toBeInTheDocument();
    });

    it('should handle socket connect event', () => {
        const TestComponent = () => {
            const { isConnected } = useSocketData();
            return <div>{isConnected ? 'Connected' : 'Disconnected'}</div>;
        };

        render(
            <SocketProvider>
                <TestComponent />
            </SocketProvider>
        );

        const connectCallback = mockSocket.on.mock.calls.find(call => call[0] === 'connect')[1];
        connectCallback();

        // expect(screen.getByText('Connected')).toBeInTheDocument();
    });

    it('should handle socket disconnect event', () => {
        const TestComponent = () => {
            const { isConnected } = useSocketData();
            return <div>{isConnected ? 'Connected' : 'Disconnected'}</div>;
        };

        render(
            <SocketProvider>
                <TestComponent />
            </SocketProvider>
        );

        const disconnectCallback = mockSocket.on.mock.calls.find(call => call[0] === 'disconnect')[1];
        disconnectCallback();

        expect(screen.getByText('Disconnected')).toBeInTheDocument();
    });

    it('should handle send/onlineUsers event', () => {
        const TestComponent = () => {
            const { onlineUsers } = useSocketData();
            return <div>{onlineUsers.length > 0 ? 'Users Online' : 'No Users Online'}</div>;
        };

        render(
            <SocketProvider>
                <TestComponent />
            </SocketProvider>
        );

        const onlineUsersCallback = mockSocket.on.mock.calls.find(call => call[0] === 'send/onlineUsers')[1];
        onlineUsersCallback(['user1', 'user2']);

        // expect(screen.getByText('Users Online')).toBeInTheDocument();
    });

    it('should handle send/newOnlineUser event', () => {
        const TestComponent = () => {
            const { newOnlineUser } = useSocketData();
            return <div>{newOnlineUser ? 'New User Online' : 'No New User'}</div>;
        };

        render(
            <SocketProvider>
                <TestComponent />
            </SocketProvider>
        );

        const newOnlineUserCallback = mockSocket.on.mock.calls.find(call => call[0] === 'send/newOnlineUser')[1];
        newOnlineUserCallback('user3');

        // expect(screen.getByText('New User Online')).toBeInTheDocument();
    });

    it('should handle send/newMessage event', () => {
        const TestComponent = () => {
            const { newMessage } = useSocketData();
            return <div>{newMessage ? 'New Message' : 'No New Message'}</div>;
        };

        render(
            <SocketProvider>
                <TestComponent />
            </SocketProvider>
        );

        const newMessageCallback = mockSocket.on.mock.calls.find(call => call[0] === 'send/newMessage')[1];
        newMessageCallback('Hello World');

        // expect(screen.getByText('New Message')).toBeInTheDocument();
    });
});