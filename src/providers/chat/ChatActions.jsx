import axios from 'axios';
import { URLS } from 'utils/constants';

const SERVER_URL = URLS.SERVER_BASE_URL;

const getAllContacts = async () => {
    try {
        const response = await axios.get(SERVER_URL + '/api/chat/contacts');
        const { data } = response.data;

        return {
            data,
            error: null
        };
    } catch(error) {
        if (error?.response?.data?.data?.length > 0) {
            error.message = `${error.response.data.data[0].msg} for field: ${error.response.data.data[0].path}`;
        }
        return {
            data: [],
            error
        };
    }
}

const getAllMessagesByContactId = async ({ id, page, pageSize }) => {
    try {
        const response = await axios.get(SERVER_URL + `/api/chat/contact/${id}/messages?page=${page}&pageSize=${pageSize}`);
        let { data, pagination } = response.data;
        data = data ? data : [];

        return {
            data,
            pagination,
            error: null
        };
    } catch(error) {
        if (error?.response?.data?.data?.length > 0) {
            error.message = `${error.response.data.data[0].msg} for field: ${error.response.data.data[0].path}`;
        }
        return {
            data: '',
            pagination: {},
            error
        };
    }
}

const sendMessage = async (payload) => {
    try {
        const response = await axios.post(SERVER_URL + '/api/chat/send-message', payload);
        const { success, errorMessage, data: {message} } = response.data;

        return {
            data: success ? message : null,
            error: success ? null : errorMessage
        };
    } catch(error) {
        if (error?.response?.data?.data?.length > 0) {
            error.message = `${error.response.data.data[0].msg} for field: ${error.response.data.data[0].path}`;
        }
        return {
            data: '',
            error
        };
    }
}

const uploadSingleImageToS3 = async (payload) => {
    try {
        const response = await axios.post(SERVER_URL + '/api/chat/upload-single-image', payload);
        const { success, errorMessage, data: {imageUrl} } = response.data;

        return {
            data: success ? imageUrl : null,
            error: success ? null : errorMessage
        };
    } catch(error) {
        if (error?.response?.data?.data?.length > 0) {
            error.message = `${error.response.data.data[0].msg} for field: ${error.response.data.data[0].path}`;
        }
        return {
            data: '',
            error
        };
    }
}

export { 
    getAllContacts,
    getAllMessagesByContactId,
    sendMessage,
    uploadSingleImageToS3
};