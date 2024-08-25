import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileUploaderInput from 'components/FileUploaderInput';

describe('FileUploaderInput', () => {
    const mockOnChangeHandler = jest.fn();
    const mockOnClickHandler = jest.fn();

    beforeEach(() => {
        mockOnChangeHandler.mockClear();
        mockOnClickHandler.mockClear();
    });

    test('renders correctly', () => {
        const { container } = render(<FileUploaderInput onChangeHandler={mockOnChangeHandler} onClickHandler={mockOnClickHandler} />);
        const inputElement = container.querySelector('#file-upload-icon');
        expect(inputElement).toBeInTheDocument();
    });

    test('calls onChangeHandler when a file is selected', () => {
        const { container } = render(<FileUploaderInput onChangeHandler={mockOnChangeHandler} onClickHandler={mockOnClickHandler} />);
        const inputElement = container.querySelector('#file-upload-icon');

        fireEvent.change(inputElement, { target: { files: [new File(['dummy content'], 'example.png', { type: 'image/png' })] } });
        expect(mockOnChangeHandler).toHaveBeenCalled();
    });

    test('calls onClickHandler when the input is clicked', () => {
        const { container } = render(<FileUploaderInput onChangeHandler={mockOnChangeHandler} onClickHandler={mockOnClickHandler} />);
        const inputElement = container.querySelector('#file-upload-icon');

        fireEvent.click(inputElement);
        expect(mockOnClickHandler).toHaveBeenCalled();
    });
});