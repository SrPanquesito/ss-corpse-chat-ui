import React from 'react';
import { render, screen } from '@testing-library/react';
import MainChatWrapper from 'components/private/chat/main/MainChatWrapper';

// Mock child components
jest.mock('components/private/chat/main/components/ConversationHeaderWrapper', () => () => <div data-testid="conversation-header-wrapper" />);
jest.mock('components/private/chat/main/components/ConversationAreaWrapper', () => () => <div data-testid="conversation-area-wrapper" />);
jest.mock('components/private/chat/main/components/SendMessageWrapper', () => () => <div data-testid="send-message-wrapper" />);

describe('MainChatWrapper', () => {
    test('renders child components correctly', () => {
        render(<MainChatWrapper />);

        // Verify that the child components are rendered
        expect(screen.getByTestId('conversation-header-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('conversation-area-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('send-message-wrapper')).toBeInTheDocument();
    });
});