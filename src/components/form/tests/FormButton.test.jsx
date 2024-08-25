import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormButton from 'components/form/FormButton';

describe('FormButton', () => {
  const mockOnSubmit = jest.fn();

  const setup = (props = {}) => {
    const defaultProps = {
      text: 'Submit',
      type: 'submit',
      onSubmit: mockOnSubmit,
    };
    return render(<FormButton {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders FormButton component with correct text', () => {
    setup({ text: 'Click Me' });

    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with correct type attribute', () => {
    setup({ type: 'button' });

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  test('calls onSubmit when button is clicked', () => {
    setup();

    const buttonElement = screen.getByText('Submit');
    fireEvent.click(buttonElement);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  test('applies correct classes to button', () => {
    setup();

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveClass('w-full py-3 px-4 bg-sky-700 dark:bg-sky-900 text-zinc-100 dark:text-zinc-100 shadow-tiny shadow-zinc-700 dark:shadow-gray-900 rounded-xl hover:bg-sky-500 dark:hover:bg-sky-950 transition-all duration-300 ease-in-out');
  });
});