// ChatProvider.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChatProvider, useChat, useDispatchChat } from 'providers/chat/ChatProvider';
import useAsyncReducer from 'hooks/useAsyncReducer';
import { chatDefaultValues } from 'providers/chat/ChatReducer';

jest.mock('hooks/useAsyncReducer');

describe('ChatProvider', () => {
    const mockDispatch = jest.fn();
    const mockChatState = { ...chatDefaultValues };

    beforeEach(() => {
        useAsyncReducer.mockReturnValue([mockChatState, mockDispatch]);
    });

    it('should provide chat context value', () => {
        const TestComponent = () => {
            const chat = useChat();
            return <div>{chat ? 'Chat Context Provided' : 'No Chat Context'}</div>;
        };

        render(
            <ChatProvider>
                <TestComponent />
            </ChatProvider>
        );

        expect(screen.getByText('Chat Context Provided')).toBeInTheDocument();
    });

    it('should provide dispatch context value', () => {
        const TestComponent = () => {
            const dispatch = useDispatchChat();
            return <div>{dispatch ? 'Dispatch Context Provided' : 'No Dispatch Context'}</div>;
        };

        render(
            <ChatProvider>
                <TestComponent />
            </ChatProvider>
        );

        expect(screen.getByText('Dispatch Context Provided')).toBeInTheDocument();
    });
});