import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonDarkmode from 'components/ButtonDarkmode';
import { useSettings, useDispatchSettings } from 'providers/settings';

// Mock the context hooks
jest.mock('providers/settings', () => ({
  useSettings: jest.fn(),
  useDispatchSettings: jest.fn(),
}));

describe('ButtonDarkmode', () => {
  it('renders correctly with dark mode off', () => {
    useSettings.mockReturnValue({ darkmode: false });
    useDispatchSettings.mockReturnValue(jest.fn());

    render(<ButtonDarkmode />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-white');
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('w-6 h-6');
  });

  it('renders correctly with dark mode on', () => {
    useSettings.mockReturnValue({ darkmode: true });
    useDispatchSettings.mockReturnValue(jest.fn());

    render(<ButtonDarkmode />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('dark:bg-slate-800');
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('w-5 h-5');
  });

  it('toggles dark mode on click', () => {
    const dispatchSettings = jest.fn();
    useSettings.mockReturnValue({ darkmode: false });
    useDispatchSettings.mockReturnValue(dispatchSettings);

    const {rerender} = render(<ButtonDarkmode />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(dispatchSettings).toHaveBeenCalledWith({ type: 'darkmode/enable' });

    useSettings.mockReturnValue({ darkmode: true });
    rerender(<ButtonDarkmode />);

    fireEvent.click(button);

    expect(dispatchSettings).toHaveBeenCalledWith({ type: 'darkmode/disable' });
  });
});