import React from 'react';
import { render, screen } from '@testing-library/react';
import UserMessage from 'components/private/chat/main/components/UserMessage';
import { useChat } from 'providers/chat';
import moment from 'moment';

// Mock the useChat hook
jest.mock('providers/chat', () => ({
  useChat: jest.fn(),
}));

describe('UserMessage', () => {
  const mockChatData = {
    lastMessageSent: { id: '123' },
  };
  const mockDate = moment().toISOString();

  beforeEach(() => {
    useChat.mockReturnValue(mockChatData);

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders correctly with content and previewImageUrl', () => {
    render(
      <UserMessage
        id="123"
        content="Hello, world!"
        date={mockDate}
        previewImageUrl="https://example.com/image.jpg"
      />
    );
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders correctly with only content', () => {
    render(
      <UserMessage
        id="123"
        content="Hello, world!"
        date={mockDate}
      />
    );
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('renders correctly with only previewImageUrl', () => {
    render(
      <UserMessage
        id="123"
        date={mockDate}
        previewImageUrl="https://example.com/image.jpg"
      />
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('scrolls into view when a new message is received', () => {
    const { container } = render(
      <UserMessage
        id="123"
        content="Hello, world!"
        date={mockDate}
      />
    );
    const messageDiv = container.querySelector('div');
    expect(messageDiv).toHaveProperty('scrollIntoView');
    expect(messageDiv.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('does not scroll into view if no new message has arrived', () => {
    useChat.mockReturnValue({ lastMessageSent: { id: '456' } });

    const { container } = render(
      <UserMessage
        id="123"
        content="Hello, world!"
        date={mockDate}
      />
    );
    const messageDiv = container.querySelector('div');
    expect(messageDiv.scrollIntoView).not.toHaveBeenCalled();
  });
});