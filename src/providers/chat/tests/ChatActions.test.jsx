import axios from 'axios';
import { 
    getAllContacts, 
    getContactById,
    getAllMessagesByContactId, 
    sendMessage, 
    uploadSingleImageToS3 
} from 'providers/chat/ChatActions';

jest.mock('axios');

describe('ChatActions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllContacts', () => {
        it('should return data on success', async () => {
            const mockData = { data: [{ id: 1, name: 'John Doe' }] };
            axios.get.mockResolvedValue({ data: { data: mockData } });

            const result = await getAllContacts({ page: 1, pageSize: 20 });
            expect(result).toEqual({ data: mockData, error: null });
        });

        it('should return data on success but server returns empty data', async () => {
            axios.get.mockResolvedValue({ data: { data: null } });

            const result = await getAllContacts({ page: 1, pageSize: 20 });
            expect(result).toEqual({ data: [], error: null });
        });

        it('should return error on failure', async () => {
            const mockError = { response: { data: { data: [{ msg: 'Error', path: 'field' }] } } };
            axios.get.mockRejectedValue(mockError);

            const result = await getAllContacts({ page: 1, pageSize: 20 });
            expect(result).toEqual({ data: [], error: mockError, paginationContacts: {} });
        });

        it('should return error on failure even if response does not bring back data', async () => {
            const mockError = { response: { data: null } };
            axios.get.mockRejectedValue(mockError);

            const result = await getAllContacts({ page: 1, pageSize: 20 });
            expect(result).toEqual({ data: [], error: mockError, paginationContacts: {} });
        });
    });

    describe('getContactById', () => {
        it('should return data on success', async () => {
            const mockData = { data: [{ id: 1, message: 'Hello' }] };
            axios.get.mockResolvedValue({ data: { data: mockData } });

            const result = await getContactById({ id: 1 });
            expect(result).toEqual({ data: mockData, error: null });
        });

        it('should return error on failure', async () => {
            const mockError = { response: { data: { data: [{ msg: 'Error', path: 'field' }] } } };
            axios.get.mockRejectedValue(mockError);

            const result = await getContactById({ id: 1 });
            expect(result).toEqual({ data: [], error: mockError });
        });

        it('should return error on failure even if response does not bring back data', async () => {
            const mockError = { response: { data: null } };
            axios.get.mockRejectedValue(mockError);

            const result = await getContactById({ id: 1 });
            expect(result).toEqual({ data: [], error: mockError });
        });
    });

    describe('getAllMessagesByContactId', () => {
        it('should return data on success', async () => {
            const mockData = { data: [{ id: 1, message: 'Hello' }] };
            axios.get.mockResolvedValue({ data: { data: mockData } });

            const result = await getAllMessagesByContactId({ id: 1, page: 1, pageSize: 20 });
            expect(result).toEqual({ data: mockData, error: null });
        });

        it('should return data on success', async () => {
            axios.get.mockResolvedValue({ data: { data: null } });

            const result = await getAllMessagesByContactId({ id: 1, page: 1, pageSize: 20 });
            expect(result).toEqual({ data: [], error: null, pagination: undefined });
        });

        it('should return error on failure', async () => {
            const mockError = { response: { data: { data: [{ msg: 'Error', path: 'field' }] } } };
            axios.get.mockRejectedValue(mockError);

            const result = await getAllMessagesByContactId({ id: 1, page: 1, pageSize: 20 });
            expect(result).toEqual({ data: '', error: mockError, pagination: {} });
        });

        it('should return error on failure even if response does not bring back data', async () => {
            const mockError = { response: { data: null } };
            axios.get.mockRejectedValue(mockError);

            const result = await getAllMessagesByContactId({ id: 1, page: 1, pageSize: 20 });
            expect(result).toEqual({ data: '', error: mockError, pagination: {} });
        });
    });

    describe('sendMessage', () => {
        it('should return message on success', async () => {
            const mockData = { success: true, data: { message: 'Message sent' } };
            axios.post.mockResolvedValue({ data: mockData });

            const result = await sendMessage({ text: 'Hello' });
            expect(result).toEqual({ data: 'Message sent', error: null });
        });

        it('should return message on success even if response has bad data from server', async () => {
            const mockData = { success: false, data: {}, errorMessage: 'Error' };
            axios.post.mockResolvedValue({ data: mockData });

            const result = await sendMessage({ text: 'Hello' });
            expect(result).toEqual({ data: null, error: 'Error' });
        });

        it('should return error on failure', async () => {
            const mockError = { response: { data: { data: [{ msg: 'Error', path: 'field' }] } } };
            axios.post.mockRejectedValue(mockError);

            const result = await sendMessage({ text: 'Hello' });
            expect(result).toEqual({ data: '', error: mockError });
        });

        it('should return error on failure even if response does not bring back data', async () => {
            const mockError = { response: { data: null } };
            axios.post.mockRejectedValue(mockError);

            const result = await sendMessage({ text: 'Hello' });
            expect(result.data).toEqual('');
        });
    });

    describe('uploadSingleImageToS3', () => {
        it('should return imageUrl on success', async () => {
            const mockData = { success: true, data: { imageUrl: 'http://image.url' } };
            axios.post.mockResolvedValue({ data: mockData });

            const result = await uploadSingleImageToS3({ image: 'imageData' });
            expect(result).toEqual({ data: 'http://image.url', error: null });
        });

        it('should return message on success even if response has bad data from server', async () => {
            const mockData = { success: false, data: {}, errorMessage: 'Error' };
            axios.post.mockResolvedValue({ data: mockData });

            const result = await uploadSingleImageToS3({ image: 'imageData' });
            expect(result).toEqual({ data: null, error: 'Error' });
        });

        it('should return error on failure', async () => {
            const mockError = { response: { data: { data: [{ msg: 'Error', path: 'field' }] } } };
            axios.post.mockRejectedValue(mockError);

            const result = await uploadSingleImageToS3({ image: 'imageData' });
            expect(result).toEqual({ data: '', error: mockError });
        });

        it('should return error on failure even if response does not bring back data', async () => {
            const mockError = { response: { data: null } };
            axios.post.mockRejectedValue(mockError);

            const result = await uploadSingleImageToS3({ image: 'imageData' });
            expect(result.data).toEqual('');
        });
    });
});