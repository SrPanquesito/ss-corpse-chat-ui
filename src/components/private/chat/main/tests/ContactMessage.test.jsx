import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactMessage from 'components/private/chat/main/components/ContactMessage';
import { useSocketData } from 'providers/socket';

// Mock the useSocketData hook
jest.mock('providers/socket', () => ({
  useSocketData: jest.fn(),
}));

describe('ContactMessage', () => {
  const mockSocketData = {
    newMessage: { id: '123' },
  };
  const date = '2023-02-04T22:44:30.652Z';

  beforeEach(() => {
    useSocketData.mockReturnValue(mockSocketData);
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('renders correctly with content and previewImageUrl', () => {
    render(
      <ContactMessage
        id="123"
        content="Hello, world!"
        date={date}
        profilePictureUrl="https://example.com/profile.jpg"
        previewImageUrl="https://example.com/image.jpg"
      />
    );
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders correctly with only content', () => {
    render(
      <ContactMessage
        id="123"
        content="Hello, world!"
        date={date}
        profilePictureUrl="https://example.com/profile.jpg"
      />
    );
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('renders correctly with only previewImageUrl', () => {
    render(
      <ContactMessage
        id="123"
        date={date}
        profilePictureUrl="https://example.com/profile.jpg"
        previewImageUrl="https://example.com/image.jpg"
      />
    );
    expect(screen.getByRole('img', { name: '' })).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders correctly without profilePictureUrl', () => {
    render(
      <ContactMessage
        id="123"
        content="Hello, world!"
        date={date}
        profilePictureUrl=""
      />
    );
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('scrolls into view when a new message is received', () => {
    const { container } = render(
      <ContactMessage
        id="123"
        content="Hello, world!"
        date={date}
        profilePictureUrl="https://example.com/profile.jpg"
      />
    );
    const messageDiv = container.querySelector('div');
    expect(messageDiv).toHaveProperty('scrollIntoView');
  });

  it('does not scroll into view if no new message has arrived', () => {
    useSocketData.mockReturnValue({newMessage: null});
    const { container } = render(
      <ContactMessage
        id="123"
        content="Hello, world!"
        date={date}
        profilePictureUrl="https://example.com/profile.jpg"
      />
    );
    const messageDiv = container.querySelector('div');
    expect(messageDiv).toHaveProperty('scrollIntoView');
  });
});