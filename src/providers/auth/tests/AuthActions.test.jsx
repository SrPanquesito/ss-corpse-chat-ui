import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setCookie, getCookie, deleteCookie } from 'utils/cookies';
import { userRegister, userLogin, authStatusFromCookies, deleteAuthCookie } from 'providers/auth/AuthActions';

jest.mock('axios');
jest.mock('jwt-decode');
jest.mock('utils/cookies');

describe('AuthActions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('userRegister', () => {
        it('should register a user successfully', async () => {
            const payload = { email: 'test@example.com', password: 'password' };
            const token = 'mockToken';
            axios.post.mockResolvedValue({ data: { data: { token } } });
            setCookie.mockImplementation(() => {});

            const result = await userRegister(payload);

            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/api/auth/register'), payload);
            expect(setCookie).toHaveBeenCalledWith('authToken', token, 365);
            expect(result.data.token).toBe(token);
            expect(result.error).toBeNull();
        });

        it('should handle registration error', async () => {
            const payload = { email: 'test@example.com', password: 'password' };
            const errorMessage = 'Invalid email';
            axios.post.mockRejectedValue({
                response: {
                    data: {
                        data: [{ msg: errorMessage, path: 'email' }]
                    }
                }
            });

            const result = await userRegister(payload);

            expect(result.data).toEqual({});
            expect(result.error.message).toBe(`${errorMessage} for field: email`);
        });

        it('should handle registration error even when response did not brought back error', async () => {
            const payload = { email: 'test@example.com', password: 'password' };
            axios.post.mockRejectedValue({
                response: {
                    data: null
                }
            });

            const result = await userRegister(payload);

            expect(result.data).toEqual({});
            expect(result.error).not.toBeNull();
            expect(result.error.message).toBeUndefined();
        });
    });

    describe('userLogin', () => {
        it('should login a user successfully', async () => {
            const payload = { email: 'test@example.com', password: 'password' };
            const token = 'mockToken';
            axios.post.mockResolvedValue({ data: { data: { token } } });
            setCookie.mockImplementation(() => {});

            const result = await userLogin(payload);

            expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/api/auth/login'), payload);
            expect(setCookie).toHaveBeenCalledWith('authToken', token, 365);
            expect(result.data.token).toBe(token);
            expect(result.error).toBeNull();
        });

        it('should handle login error', async () => {
            const payload = { email: 'test@example.com', password: 'password' };
            const errorMessage = 'Invalid email';
            axios.post.mockRejectedValue({
                response: {
                    data: {
                        data: [{ msg: errorMessage, path: 'email' }]
                    }
                }
            });

            const result = await userLogin(payload);

            expect(result.data).toEqual({});
            expect(result.error.message).toBe(`${errorMessage} for field: email`);
        });

        it('should handle login error even when response did not brought back error', async () => {
            const payload = { email: 'test@example.com', password: 'password' };
            axios.post.mockRejectedValue({
                response: {
                    data: null
                }
            });

            const result = await userLogin(payload);

            expect(result.data).toEqual({});
            expect(result.error).not.toBeNull();
            expect(result.error.message).toBeUndefined();
        });
    });

    describe('authStatusFromCookies', () => {
        it('should return authenticated user from valid token', () => {
            const token = 'validToken';
            const decodedToken = {
                exp: Date.now() / 1000 + 3600,
                userId: '123',
                email: 'test@example.com',
                username: 'testuser',
                profilePictureUrl: 'http://example.com/profile.jpg',
                status: 'active'
            };
            getCookie.mockReturnValue(token);
            jwtDecode.mockReturnValue(decodedToken);

            const result = authStatusFromCookies();

            expect(result.isAuthenticated).toBe(true);
            expect(result.user).toEqual({
                id: decodedToken.userId,
                email: decodedToken.email,
                username: decodedToken.username,
                profilePictureUrl: decodedToken.profilePictureUrl,
                profilePictureThumbnailUrl: '',
                status: decodedToken.status
            });
        });

        it('should return unauthenticated user from expired token', () => {
            const token = 'expiredToken';
            const decodedToken = {
                exp: Date.now() / 1000 - 3600
            };
            getCookie.mockReturnValue(token);
            jwtDecode.mockReturnValue(decodedToken);

            const result = authStatusFromCookies();

            expect(deleteCookie).toHaveBeenCalledWith('authToken');
            expect(result.isAuthenticated).toBe(false);
            expect(result.user).toEqual({});
        });
    });

    describe('deleteAuthCookie', () => {
        it('should delete auth cookie and return unauthenticated user', () => {
            const result = deleteAuthCookie();

            expect(deleteCookie).toHaveBeenCalledWith('authToken');
            expect(result.isAuthenticated).toBe(false);
            expect(result.user).toEqual({});
        });
    });
});