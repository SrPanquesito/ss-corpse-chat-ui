import { socketReducer } from 'providers/socket/SocketProvider';

describe('socketReducer', () => {
    it('should handle connect action', () => {
        const initialState = { isConnected: false };
        const action = { type: 'connect' };
        const newState = socketReducer(initialState, action);
        expect(newState.isConnected).toBe(true);
    });

    it('should handle disconnect action', () => {
        const initialState = { isConnected: true };
        const action = { type: 'disconnect' };
        const newState = socketReducer(initialState, action);
        expect(newState.isConnected).toBe(false);
    });

    it('should handle set/onlineUsers action', () => {
        const initialState = { onlineUsers: [] };
        const action = { type: 'set/onlineUsers', onlineUsers: ['user1', 'user2'] };
        const newState = socketReducer(initialState, action);
        expect(newState.onlineUsers).toEqual(['user1', 'user2']);
    });

    it('should handle set/newOnlineUser action', () => {
        const initialState = { newOnlineUser: null };
        const action = { type: 'set/newOnlineUser', newOnlineUser: 'user3' };
        const newState = socketReducer(initialState, action);
        expect(newState.newOnlineUser).toBe('user3');
    });

    it('should handle set/newMessage action', () => {
        const initialState = { newMessage: null };
        const action = { type: 'set/newMessage', newMessage: 'Hello World' };
        const newState = socketReducer(initialState, action);
        expect(newState.newMessage).toBe('Hello World');
    });

    it('should throw an error for unknown action type', () => {
        const initialState = {};
        const action = { type: 'unknown' };
        expect(() => socketReducer(initialState, action)).toThrow('Unknown action: unknown');
    });
});