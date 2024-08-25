import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from 'components/MessageInput';
import { useDispatchAbsolute } from 'providers/absolute';

jest.mock('providers/absolute');

describe('MessageInput', () => {
    const mockDispatchAbsolute = jest.fn();
    const mockOnChangeHandler = jest.fn();
    const mockOnEnterHandler = jest.fn();

    beforeEach(() => {
        useDispatchAbsolute.mockReturnValue(mockDispatchAbsolute);
        mockDispatchAbsolute.mockClear();
        mockOnChangeHandler.mockClear();
        mockOnEnterHandler.mockClear();
    });

    test('renders correctly', () => {
        render(<MessageInput id="test-id" placeholder="Type a message" value="" onChangeHandler={mockOnChangeHandler} onEnterHandler={mockOnEnterHandler} />);
        const textAreaElement = screen.getByPlaceholderText('Type a message');
        expect(textAreaElement).toBeInTheDocument();
    });

    test('calls onChangeHandler when textarea value changes', () => {
        render(<MessageInput id="test-id" placeholder="Type a message" value="" onChangeHandler={mockOnChangeHandler} onEnterHandler={mockOnEnterHandler} />);
        const textAreaElement = screen.getByPlaceholderText('Type a message');

        fireEvent.change(textAreaElement, { target: { value: 'Hello' } });
        expect(mockOnChangeHandler).toHaveBeenCalled();
    });

    test('calls onEnterHandler when Enter key is pressed without Shift key', () => {
        render(<MessageInput id="test-id" placeholder="Type a message" value="" onChangeHandler={mockOnChangeHandler} onEnterHandler={mockOnEnterHandler} />);
        const textAreaElement = screen.getByPlaceholderText('Type a message');

        fireEvent.keyDown(textAreaElement, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
        expect(mockOnEnterHandler).toHaveBeenCalled();
    });

    test('does not call onEnterHandler when Enter key is pressed with Shift key', () => {
        render(<MessageInput id="test-id" placeholder="Type a message" value="" onChangeHandler={mockOnChangeHandler} onEnterHandler={mockOnEnterHandler} />);
        const textAreaElement = screen.getByPlaceholderText('Type a message');

        fireEvent.keyDown(textAreaElement, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13, shiftKey: true });
        expect(mockOnEnterHandler).not.toHaveBeenCalled();
    });

    test('calls toggleEmojiPicker when emoji picker button is clicked', () => {
        render(<MessageInput id="test-id" placeholder="Type a message" value="" onChangeHandler={mockOnChangeHandler} onEnterHandler={mockOnEnterHandler} />);
        const emojiPickerButton = screen.getByRole('img');

        fireEvent.click(emojiPickerButton);
        expect(mockDispatchAbsolute).toHaveBeenCalledWith({ type: 'emojipicker/toggle' });
    });
});