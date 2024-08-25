import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SendMessageWrapper from 'components/private/chat/main/components/SendMessageWrapper';
import { useChat, useDispatchChat } from 'providers/chat';
import { useAuth } from 'providers/auth';
import { useDispatchAbsolute } from 'providers/absolute';
import { uploadSingleImageToS3 } from 'providers/chat/ChatActions';
import { socket } from 'utils/socket';

// Mock dependencies
jest.mock('providers/chat');
jest.mock('providers/auth');
jest.mock('providers/absolute');
jest.mock('utils/socket');
jest.mock('providers/chat/ChatActions');

describe('SendMessageWrapper', () => {
    const mockDispatchChat = jest.fn();
    const mockDispatchAbsolute = jest.fn();

    beforeEach(() => {
        useChat.mockReturnValue({
            selectedEmoji: '',
            sendMessageSuccess: false,
            lastMessageSent: null,
            activeContact: { id: '1', username: 'John Doe' },
        });
        useAuth.mockReturnValue({
            user: { id: '2' },
        });
        useDispatchChat.mockReturnValue(mockDispatchChat);
        useDispatchAbsolute.mockReturnValue(mockDispatchAbsolute);
        socket.timeout = jest.fn().mockReturnValue({ emit: jest.fn() });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<SendMessageWrapper />);
        expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
    });

    test('handles message input change', () => {
        render(<SendMessageWrapper />);
        const messageInput = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(messageInput, { target: { value: 'Hello' } });
        expect(messageInput.value).toBe('Hello');
    });

    test('handles send message on Enter key press', () => {
        render(<SendMessageWrapper />);
        const messageInput = screen.getByPlaceholderText('Type a message...');
        act(() => {
            fireEvent.change(messageInput, { target: { value: 'Hello' } });
            fireEvent.keyDown(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(mockDispatchChat).toHaveBeenCalledWith(expect.objectContaining({ type: 'http/post/send-message' }));
    });

    test('handles send message on Enter key press - Do not allow empty messages to be sent', () => {
        render(<SendMessageWrapper />);
        const messageInput = screen.getByPlaceholderText('Type a message...');
        act(() => {
            fireEvent.change(messageInput, { target: { value: '' } });
            fireEvent.keyDown(messageInput, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(mockDispatchChat).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'http/post/send-message' }));
    });

    test('handles image upload', async () => {
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
        uploadSingleImageToS3.mockResolvedValue({ data: 'http://example.com/example.png' });

        const { container } = render(<SendMessageWrapper />);
        const imageInput = container.querySelector("#image-upload-icon");
        await act(async () => {
            fireEvent.change(imageInput, { target: { files: [file] } });
        });

        const sendButton = screen.getByTestId('send-message-button');
        await act(async () => {
            fireEvent.click(sendButton);
        });

        expect(uploadSingleImageToS3).toHaveBeenCalled();
        expect(useDispatchChat).toHaveBeenCalled();
    });

    test('disables send button after sending message', () => {
        render(<SendMessageWrapper />);
        const messageInput = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(messageInput, { target: { value: 'Hello' } });
        const sendButton = screen.getByTestId('send-message-button');
        fireEvent.click(sendButton);
    });

    test('shows notification on successful message send', () => {
        useChat.mockReturnValueOnce({
            selectedEmoji: '',
            sendMessageSuccess: true,
            lastMessageSent: { id: '1', text: 'Hello', status: 'seen' },
            activeContact: { id: '1', username: 'John Doe' },
        });

        render(<SendMessageWrapper />);
        expect(mockDispatchAbsolute).toHaveBeenCalledWith(expect.objectContaining({
            type: 'notificationalert/show',
            notificationAlertOptions: {
                type: 'success',
                message: 'Sent message successfully'
            }
        }));
    });

    test('calls onChangeHandler when image upload icon is interacted with', async () => {
        render(<SendMessageWrapper />);
        const imageUploadIcon = screen.getByTestId("image-upload-icon");

        // Simulate change event
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
        fireEvent.change(imageUploadIcon, { target: { files: [file] } });

        await waitFor (() => {
            expect(mockDispatchAbsolute).toHaveBeenCalledWith(expect.objectContaining({
                type: 'imagepreviewdisplay/set'
            }));
        });
    });

    test('calls onChangeHandler when image upload icon is interacted with', async () => {
        const { container } = render(<SendMessageWrapper />);
        const imageUploadIcon = container.querySelector("#image-upload-icon");
        
        // Simulate click event
        fireEvent.click(imageUploadIcon);
        await waitFor (() => {
            expect(mockDispatchAbsolute).toHaveBeenCalledWith(expect.objectContaining({
                type: 'imagepreviewdisplay/show'
            }));
        });
    });
});