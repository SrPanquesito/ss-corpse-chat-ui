import { renderHook, act } from '@testing-library/react';
import useAsyncReducer from 'hooks/useAsyncReducer';

// Define a simple reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'ASYNC_INCREMENT':
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ count: state.count + 1 });
        }, 100);
      });
    case 'ASYNC_ERROR':
      return new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Async error'));
        }, 100);
      });
    default:
      return state;
  }
};

describe('useAsyncReducer', () => {
  test('should initialize with initial state', () => {
    const { result } = renderHook(() => useAsyncReducer(reducer, { count: 0 }));
    const [state] = result.current;
    expect(state).toEqual({ count: 0 });
  });

  test('should handle synchronous actions', async () => {
    const { result } = renderHook(() => useAsyncReducer(reducer, { count: 0 }));
    const [, dispatch] = result.current;

    await act(async () => {
      await dispatch({ type: 'INCREMENT' });
    });

    const [state] = result.current;
    expect(state).toEqual({ count: 1 });
  });

  test('should handle asynchronous actions', async () => {
    const { result } = renderHook(() => useAsyncReducer(reducer, { count: 0 }));
    const [, dispatch] = result.current;

    await act(async () => {
      await dispatch({ type: 'ASYNC_INCREMENT' });
    });

    const [state] = result.current;
    expect(state).toEqual({ count: 1 });
  });

  test('should handle asynchronous errors', async () => {
    const { result } = renderHook(() => useAsyncReducer(reducer, { count: 0 }));
    const [, dispatch] = result.current;

    await act(async () => {
      await dispatch({ type: 'ASYNC_ERROR' });
    });

    const [state] = result.current;
    expect(state).toEqual({ count: 0, error: new Error('Async error') });
  });

  test('should handle asynchronous errors, null initialState', async () => {
    const { result } = renderHook(() => useAsyncReducer(reducer));
    const [, dispatch] = result.current;

    await act(async () => {
      await dispatch({ type: 'ASYNC_ERROR' });
    });

    const [state] = result.current;
    expect(state).toEqual({ error: new Error('Async error') });
  });
});