import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setCookie, getCookie, deleteCookie } from 'utils/cookies';
import { URLS } from 'utils/constants';
const SERVER_URL = URLS.SERVER_BASE_URL;

const userRegister = async (payload) => {
    try {
        const response = await axios.post(SERVER_URL + '/api/auth/register', payload);
        const { data: {token} } = response.data;
        setCookie('authToken', token, 365);

        const { user } = authStatusFromCookies();

        return {
            data: {
                ...user,
                token
            },
            error: null
        };
    } catch(error) {
        if (error?.response?.data?.data?.length > 0) {
            error.message = `${error.response.data.data[0].msg} for field: ${error.response.data.data[0].path}`;
        }
        return {
            data: {},
            error
        };
    }
}

const userLogin = async(payload) => {
    try {
        const response = await axios.post(SERVER_URL + '/api/auth/login', payload)
        const { data: {token} } = response.data;
        setCookie('authToken', token, 365);

        const { user } = authStatusFromCookies();

        return {
            data: {
                ...user,
                token
            },
            error: null
        };
    } catch(error) {
        if (error?.response?.data?.data?.length > 0) {
            error.message = `${error.response.data.data[0].msg} for field: ${error.response.data.data[0].path}`;
        }
        return {
            data: {}, 
            error
        };
    }
}

const authStatusFromCookies = () => {
    const values = {
        user: {},
        isAuthenticated: false,
        error: null
    };
    // Retrieve live session and setup token for axios requests
    const getToken = getCookie('authToken');
    if (getToken) {
        const tokenDecode = jwtDecode(getToken);
        if (tokenDecode.exp * 1000 < Date.now()) {
            deleteCookie('authToken');
        } else {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken;
            values.isAuthenticated = true;
            values.user = {
                id: tokenDecode.userId,
                email: tokenDecode.email,
                username: tokenDecode.username,
                profilePictureUrl: tokenDecode.profilePictureUrl,
                profilePictureThumbnailUrl: tokenDecode.profilePictureThumbnailUrl || '',
                status: tokenDecode.status
            }
        }
    }
    return values
}

const deleteAuthCookie = () => {
    deleteCookie('authToken');
    return {
        user: {},
        isAuthenticated: false,
        error: null
    };
}

export {
    userRegister,
    userLogin,
    authStatusFromCookies,
    deleteAuthCookie
};