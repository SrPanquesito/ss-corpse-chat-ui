import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from 'components/SearchInput';

describe('SearchInput', () => {
  const mockOnChangeHandler = jest.fn();

  const setup = (props = {}) => {
    const defaultProps = {
      id: 'search-input',
      placeholder: 'Search...',
      value: '',
      onChangeHandler: mockOnChangeHandler,
    };
    return render(<SearchInput {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders SearchInput component', () => {
    setup();

    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });

  test('renders with correct initial value', () => {
    setup({ value: 'initial value' });

    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toHaveValue('initial value');
  });

  test('calls onChangeHandler when input value changes', () => {
    setup();

    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(mockOnChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockOnChangeHandler).toHaveBeenCalledWith(expect.any(Object));
  });

  test('renders with correct id and name attributes', () => {
    setup({ id: 'custom-id' });

    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toHaveAttribute('id', 'custom-id');
    expect(inputElement).toHaveAttribute('name', 'custom-id');
  });
});