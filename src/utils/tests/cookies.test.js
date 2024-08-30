// cookies.test.js
import { setCookie, getCookie, deleteCookie } from 'utils/cookies';

describe('Cookie Functions', () => {
    beforeEach(() => {
        // Clear all cookies before each test
        document.cookie.split(";").forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    });

    it('should set a cookie', () => {
        setCookie('testCookie', 'testValue', 1);
        expect(document.cookie).toContain('testCookie=testValue');
    });

    it('should get a cookie', () => {
        document.cookie = 'testCookie=testValue';
        const value = getCookie('testCookie');
        expect(value).toBe('testValue');
    });

    it('should return empty string for non-existent cookie', () => {
        const value = getCookie('nonExistentCookie');
        expect(value).toBe('');
    });

    it('should delete a cookie', () => {
        document.cookie = 'testCookie=testValue';
        deleteCookie('testCookie');
        expect(document.cookie).not.toContain('testCookie=testValue');
    });
});