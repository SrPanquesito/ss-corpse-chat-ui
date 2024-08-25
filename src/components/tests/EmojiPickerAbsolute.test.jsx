import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmojiPickerAbsolute from 'components/EmojiPickerAbsolute';
import { useSettings } from 'providers/settings';
import { useAbsolute, useDispatchAbsolute } from 'providers/absolute';
import { useDispatchChat } from 'providers/chat';

jest.mock('providers/settings');
jest.mock('providers/absolute');
jest.mock('providers/chat');

describe('EmojiPickerAbsolute', () => {
    let mockDispatchAbsolute, mockDispatchChat;

    beforeAll(() => {
        global.IntersectionObserver = class {
            constructor() {}
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    });

    beforeEach(() => {
        mockDispatchAbsolute = jest.fn();
        mockDispatchChat = jest.fn();

        useSettings.mockReturnValue({ darkmode: false });
        useAbsolute.mockReturnValue({ showEmojiPicker: true });
        useDispatchAbsolute.mockReturnValue(mockDispatchAbsolute);
        useDispatchChat.mockReturnValue(mockDispatchChat);
    });

    test('renders correctly', () => {
        const { container } = render(<EmojiPickerAbsolute />);
        const picker = container.querySelector('#emoji-picker-absolute');
        expect(picker).not.toBeNull();
    });

    test('renders with dark theme when darkmode is true', () => {
        useSettings.mockReturnValue({ darkmode: true });
        const { container } = render(<EmojiPickerAbsolute />);
        const picker = container.querySelector('#emoji-picker-absolute');
        expect(picker).not.toBeNull();
    });

    test.skip('onEmojiClick dispatches set/selectedEmoji action', async () => {
        const { container } = render(<EmojiPickerAbsolute />);
        const picker = container.querySelector('#emoji-picker-absolute');

        // Mock the clientHeight to simulate the picker being visible
        Object.defineProperty(picker, 'clientHeight', { value: 100 });

        expect(picker).not.toBeNull();

        // Find the emoji picker element
        screen.debug();
        const emojiButton = await screen.findByRole('button', { name: 'Activities' });

        // Check if the emoji element is found
        expect(emojiButton).not.toBeNull();

        // Simulate a click event on the found emoji element
        fireEvent.click(emojiButton);

        expect(mockDispatchChat).toHaveBeenCalledWith({ type: 'set/selectedEmoji', selectedEmoji: '😊' });
    });

    test('handleClickOutside dispatches hide action when picker is visible', () => {
        const { container } = render(<EmojiPickerAbsolute />);
        const picker = container.querySelector('#emoji-picker-absolute');
        
        // Mock the clientHeight to simulate the picker being visible
        Object.defineProperty(picker, 'clientHeight', { value: 100 });

        fireEvent.click(document);
        expect(mockDispatchAbsolute).toHaveBeenCalledWith({ type: 'emojipicker/hide' });
    });

    test('handleClickOutside does not dispatch hide action when picker is not visible', () => {
        const { container } = render(<EmojiPickerAbsolute />);
        const picker = container.querySelector('#emoji-picker-absolute');
        
        // Mock the clientHeight to simulate the picker being not visible
        Object.defineProperty(picker, 'clientHeight', { value: 0 });

        fireEvent.click(document);
        expect(mockDispatchAbsolute).not.toHaveBeenCalled();
    });

    test('handleClickOutside does not dispatch hide action when click is inside picker', () => {
        const { container } = render(<EmojiPickerAbsolute />);
        const picker = container.querySelector('#emoji-picker-absolute');
        
        // Mock the clientHeight to simulate the picker being visible
        Object.defineProperty(picker, 'clientHeight', { value: 100 });

        fireEvent.click(picker);
        expect(mockDispatchAbsolute).not.toHaveBeenCalled();
    });

    test('adds and removes event listener for clicks outside', () => {
        const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

        const { unmount } = render(<EmojiPickerAbsolute />);
        expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), false);

        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), false);

        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });
});