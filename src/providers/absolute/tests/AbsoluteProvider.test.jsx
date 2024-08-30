import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AbsoluteProvider, useAbsolute, useDispatchAbsolute } from 'providers/absolute';
import { absoluteDefaultValues } from 'providers/absolute/AbsoluteReducer';

// Mock child component to test context values
const MockChild = () => {
  const absolute = useAbsolute();
  const dispatchAbsolute = useDispatchAbsolute();

  return (
    <div>
      <span data-testid="showEmojiPicker">{absolute.showEmojiPicker.toString()}</span>
      <button onClick={() => dispatchAbsolute({ type: 'emojipicker/toggle' })}>Toggle Emoji Picker</button>
    </div>
  );
};

describe('AbsoluteProvider', () => {
  it('provides default context values', () => {
    render(
      <AbsoluteProvider>
        <MockChild />
      </AbsoluteProvider>
    );

    // Verify default context values
    expect(screen.getByTestId('showEmojiPicker').textContent).toBe(absoluteDefaultValues.showEmojiPicker.toString());
  });

  it('updates context values when dispatching actions', () => {
    render(
      <AbsoluteProvider>
        <MockChild />
      </AbsoluteProvider>
    );

    // Verify initial state
    expect(screen.getByTestId('showEmojiPicker').textContent).toBe('false');

    // Dispatch action to toggle emoji picker
    act(() => {
      screen.getByText('Toggle Emoji Picker').click();
    });

    // Verify updated state
    expect(screen.getByTestId('showEmojiPicker').textContent).toBe('true');
  });
});