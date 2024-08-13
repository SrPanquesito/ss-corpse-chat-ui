import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useAsyncReducer from 'hooks/useAsyncReducer';
import { chatReducer, chatDefaultValues } from './ChatReducer';

const ChatContext = createContext(null);
const ChatDispatchContext = createContext(null);

export function ChatProvider({ children }) {
    const [chat, dispatchChat] = useAsyncReducer(chatReducer, chatDefaultValues);

    return (
        <ChatContext.Provider value={chat}>
          <ChatDispatchContext.Provider value={dispatchChat}>
            {children}
          </ChatDispatchContext.Provider>
        </ChatContext.Provider>
      );
}

ChatProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useChat() {
    return useContext(ChatContext);
}

export function useDispatchChat() {
    return useContext(ChatDispatchContext);
}
