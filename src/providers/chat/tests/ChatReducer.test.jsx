// ChatReducer.test.js
import { chatReducer, chatDefaultValues } from 'providers/chat/ChatReducer';
import { getAllContacts, getAllMessagesByContactId, sendMessage } from 'providers/chat/ChatActions';

jest.mock('providers/chat/ChatActions');

describe('chatReducer', () => {
    const initialState = { ...chatDefaultValues };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle http/get/contacts action', async () => {
        const mockData = [{ id: 1, name: 'John Doe' }];
        getAllContacts.mockResolvedValue({ data: mockData, error: null });

        const action = { type: 'http/get/contacts' };
        const newState = await chatReducer(initialState, action);

        expect(newState.allContacts).toEqual(mockData);
        expect(newState.contacts).toEqual(mockData);
        expect(newState.retrievedInitialContacts).toBe(true);
        expect(newState.error).toBe(null);
    });

    it('should handle http/get/contact/messages action', async () => {
        const mockData = [{ id: 1, message: 'Hello' }];
        getAllMessagesByContactId.mockResolvedValue({ data: mockData, error: null });

        const action = { type: 'http/get/contact/messages', payload: { id: 1 } };
        const newState = await chatReducer(initialState, action);

        expect(newState.activeMessages).toEqual(mockData);
        expect(newState.error).toBe(null);
    });

    it('should handle http/post/send-message action', async () => {
        const mockData = { id: 1, message: 'Hello' };
        sendMessage.mockResolvedValue({ data: mockData, error: null });

        const action = { type: 'http/post/send-message', payload: { text: 'Hello' } };
        const newState = await chatReducer(initialState, action);

        expect(newState.activeMessages[0]).toEqual(mockData);
        expect(newState.lastMessageSent).toEqual(mockData);
        expect(newState.sendMessageSuccess).toBe(true);
        expect(newState.error).toBe(null);
    });

    it('should handle http/post/send-message action', async () => {
        const mockError = new Error('Failed to send message');
        sendMessage.mockResolvedValue({ data: {}, error: mockError });

        const action = { type: 'http/post/send-message', payload: { text: 'Hello' } };
        const newState = await chatReducer(initialState, action);

        expect(newState.lastMessageSent).toEqual(null);
        expect(newState.sendMessageSuccess).toBe(false);
        expect(newState.error).toBe(mockError);
    });

    it('should handle add/received/new-message action', async () => {
        const newMessage = { id: 1, message: 'Hello' };
        const action = { type: 'add/received/new-message', newMessage };
        const newState = await chatReducer(initialState, action);

        expect(newState.activeMessages[0]).toEqual(newMessage);
    });

    it('should handle update/contacts action', async () => {
        const contacts = [{ id: 1, name: 'John Doe' }];
        const action = { type: 'update/contacts', contacts };
        const newState = await chatReducer(initialState, action);

        expect(newState.contacts).toEqual(contacts);
    });

    it('should handle update/contacts/last-message action', async () => {
        const initialStateWithContacts = {
            ...initialState,
            contacts: [{ id: 1, name: 'John Doe', lastMessage: null }]
        };
        const newMessage = { id: 1, senderId: 1, message: 'Hello' };
        const action = { type: 'update/contacts/last-message', newMessage };
        const newState = await chatReducer(initialStateWithContacts, action);

        expect(newState.contacts[0].lastMessage).toEqual(newMessage);
    });

    it('should handle update/contacts/last-message action when contact is the receiver', async () => {
        const initialStateWithContacts = {
            ...initialState,
            contacts: [{ id: 1, name: 'John Doe', lastMessage: null }]
        };
        const newMessage = { id: 1, receiverId: 1, message: 'Hello' };
        const action = { type: 'update/contacts/last-message', newMessage };
        const newState = await chatReducer(initialStateWithContacts, action);

        expect(newState.contacts[0].lastMessage).toEqual(newMessage);
    });

    it('should handle update/contacts/last-message action when no contact matches the newMessage data', async () => {
        const initialStateWithContacts = {
            ...initialState,
            contacts: [{ id: 1, name: 'John Doe', lastMessage: null }]
        };
        const newMessage = { id: 5, receiverId: 6, message: 'Hello' };
        const action = { type: 'update/contacts/last-message', newMessage };
        const newState = await chatReducer(initialStateWithContacts, action);

        expect(newState.contacts[0].lastMessage).toEqual(null);
    });

    it('should handle set/activeContact action', async () => {
        const activeContact = { id: 1, name: 'John Doe', lastMessage: { id: 1, status: 'unseen' } };
        const action = { type: 'set/activeContact', activeContact };
        const newState = await chatReducer(initialState, action);

        expect(newState.activeContact.lastMessage.status).toBe('seen');
    });

    it('should handle set/activeContact action without lastMessage', async () => {
        const activeContact = { id: 1, name: 'John Doe', lastMessage: null };
        const action = { type: 'set/activeContact', activeContact };
        const newState = await chatReducer(initialState, action);

        expect(newState.activeContact.lastMessage).toBeNull();
    });

    it('should handle set/selectedEmoji action', async () => {
        const selectedEmoji = '😀';
        const action = { type: 'set/selectedEmoji', selectedEmoji };
        await chatReducer(initialState, action);
    });

    it('should handle clear/sendMessageSuccess action', async () => {
        const initialStateWithSuccess = { ...initialState, sendMessageSuccess: true };
        const action = { type: 'clear/sendMessageSuccess' };
        const newState = await chatReducer(initialStateWithSuccess, action);

        expect(newState.sendMessageSuccess).toBe(false);
    });

    it('should throw error for unknown action type', async () => {
        const action = { type: 'unknown/action' };
        try {
            await chatReducer(initialState, action)   
        } catch (error) {
            expect(error.message).toBe('Unknown action: unknown/action');
        }
    });
});