import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth, useDispatchAuth } from 'providers/auth/AuthProvider';
import useAsyncReducer from 'hooks/useAsyncReducer';

jest.mock('hooks/useAsyncReducer');

const mockDispatchAuth = jest.fn();

describe('AuthProvider', () => {
    const mockAuthData = { user: { id: '123' }, isAuthenticated: true };

    beforeEach(() => {
        useAsyncReducer.mockReturnValue([mockAuthData, mockDispatchAuth]);
    });

    it('should render children', () => {
        render(
            <AuthProvider>
                <div data-testid="child">Child</div>
            </AuthProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide authData and dispatchAuth through context', () => {
        let authData, dispatchAuth;

        const TestComponent = () => {
            authData = useAuth();
            dispatchAuth = useDispatchAuth();
            return null;
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(authData).toEqual(mockAuthData);
        expect(dispatchAuth).toBe(mockDispatchAuth);
    });
});

describe('useAuth', () => {
    it('should return auth context value', () => {
        const mockAuthData = { user: { id: '123' }, isAuthenticated: true };
        useAsyncReducer.mockReturnValue([mockAuthData, mockDispatchAuth]);

        const TestComponent = () => {
            const auth = useAuth();
            return <div>{auth.user.id}</div>;
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByText('123')).toBeInTheDocument();
    });
});

describe('useDispatchAuth', () => {
    it('should return dispatch auth context value', () => {
        const mockAuthData = { user: { id: '123' }, isAuthenticated: true };
        useAsyncReducer.mockReturnValue([mockAuthData, mockDispatchAuth]);

        const TestComponent = () => {
            const dispatch = useDispatchAuth();
            dispatch();
            return null;
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(mockDispatchAuth).toHaveBeenCalled();
    });
});