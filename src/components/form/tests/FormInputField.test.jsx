import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormInputField from 'components/form/FormInputField';

describe('FormInputField', () => {
  const mockOnChangeHandler = jest.fn();

  const setup = (props = {}) => {
    const defaultProps = {
      id: 'input-field',
      label: 'Label',
      placeholder: 'Enter text',
      type: 'text',
      value: '',
      onChangeHandler: mockOnChangeHandler,
    };
    return render(<FormInputField {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders FormInputField component with correct label', () => {
    setup();

    const labelElement = screen.getByText('Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders input element with correct placeholder', () => {
    setup();

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders input element with correct initial value', () => {
    setup({ value: 'initial value' });

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toHaveValue('initial value');
  });

  test('calls onChangeHandler when input value changes', () => {
    setup();

    const inputElement = screen.getByPlaceholderText('Enter text');
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(mockOnChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockOnChangeHandler).toHaveBeenCalledWith(expect.any(Object));
  });

  test('renders file input with correct elements when type is file', () => {
    setup({ type: 'file', value: 'image.jpg' });

    const imgElement = screen.getByAltText('profile');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'image.jpg');

    const fileInputElement = screen.getByAltText('file-input');
    expect(fileInputElement).toBeInTheDocument();
    expect(fileInputElement).toHaveAttribute('type', 'file');
  });

  test('renders empty div when file input has no value', () => {
    setup({ type: 'file', value: '' });

    const emptyDivElement = screen.getByAltText('file-input').previousSibling;
    expect(emptyDivElement).toBeInTheDocument();
    expect(emptyDivElement).toHaveClass('w-12 h-12 rounded-full border dark:bg-zinc-900 border-zinc-300 dark:border-slate-700');
  });
});