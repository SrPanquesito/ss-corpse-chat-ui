import { userRegister, userLogin, deleteAuthCookie } from 'providers/auth/AuthActions';
import { authReducer, authDefaultValues } from 'providers/auth/AuthReducer';

jest.mock('providers/auth/AuthActions');

describe('authReducer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle http/auth/register action successfully', async () => {
        const action = { type: 'http/auth/register', data: { email: 'test@example.com', password: 'password' } };
        const mockData = { token: 'mockToken' };
        userRegister.mockResolvedValue({ data: mockData, error: null });

        const result = await authReducer(authDefaultValues, action);

        expect(userRegister).toHaveBeenCalledWith(action.data);
        expect(result).toEqual({
            ...authDefaultValues,
            user: mockData,
            isAuthenticated: true,
            error: null
        });
    });

    it('should handle http/auth/register action with error', async () => {
        const action = { type: 'http/auth/register', data: { email: 'test@example.com', password: 'password' } };
        const mockError = { message: 'Registration failed' };
        userRegister.mockResolvedValue({ data: {}, error: mockError });

        const result = await authReducer(authDefaultValues, action);

        expect(userRegister).toHaveBeenCalledWith(action.data);
        expect(result).toEqual({
            ...authDefaultValues,
            user: {},
            isAuthenticated: false,
            error: mockError
        });
    });

    it('should handle http/auth/login action successfully', async () => {
        const action = { type: 'http/auth/login', data: { email: 'test@example.com', password: 'password' } };
        const mockData = { token: 'mockToken' };
        userLogin.mockResolvedValue({ data: mockData, error: null });

        const result = await authReducer(authDefaultValues, action);

        expect(userLogin).toHaveBeenCalledWith(action.data);
        expect(result).toEqual({
            ...authDefaultValues,
            user: mockData,
            isAuthenticated: true,
            error: null
        });
    });

    it('should handle http/auth/login action with error', async () => {
        const action = { type: 'http/auth/login', data: { email: 'test@example.com', password: 'password' } };
        const mockError = { message: 'Login failed' };
        userLogin.mockResolvedValue({ data: {}, error: mockError });

        const result = await authReducer(authDefaultValues, action);

        expect(userLogin).toHaveBeenCalledWith(action.data);
        expect(result).toEqual({
            ...authDefaultValues,
            user: {},
            isAuthenticated: false,
            error: mockError
        });
    });

    it('should handle auth/logout action', async () => {
        const action = { type: 'auth/logout' };
        const mockData = { user: {}, isAuthenticated: false, error: null };
        deleteAuthCookie.mockResolvedValue(mockData);

        const result = await authReducer(authDefaultValues, action);

        expect(deleteAuthCookie).toHaveBeenCalled();
        expect(result).toEqual({});
    });

    it('should handle manual/setup action', async () => {
        const action = { type: 'manual/setup', user: { id: '123' }, isAuthenticated: true };

        const result = await authReducer(authDefaultValues, action);

        expect(result).toEqual({
            ...authDefaultValues,
            user: action.user,
            isAuthenticated: action.isAuthenticated
        });
    });

    it('should throw error for unknown action type', async () => {
        const action = { type: 'unknown/action' };
        try {
            await authReducer(authDefaultValues, action)   
        } catch (error) {
            expect(error.message).toBe('Unknown action: unknown/action');
        }
    });
});