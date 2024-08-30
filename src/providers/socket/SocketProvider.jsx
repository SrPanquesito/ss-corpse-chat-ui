import React, { useEffect, createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { socket } from 'utils/socket';

const SocketContext = createContext(null);

const socketValues = {
  isConnected: false,
  onlineUsers: [],
  newOnlineUser: null,
  newMessage: null
};

export function socketReducer(prev, action) {
  switch (action.type) {
      case 'connect': {
        return {
            ...prev,
            isConnected: true
        };
      }
      case 'disconnect': {
        return {
            ...prev,
            isConnected: false
        };
      }
      case 'set/onlineUsers': {
        return {
            ...prev,
            onlineUsers: action.onlineUsers
        };
      }
      case 'set/newOnlineUser': {
        return {
            ...prev,
            newOnlineUser: action.newOnlineUser
        };
      }
      case 'set/newMessage': {
        return {
            ...prev,
            newMessage: action.newMessage
        };
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
  }
}

export function SocketProvider({ children }) {
    const [socketConfig, dispatch] = useReducer(socketReducer, socketValues);

    function onConnect() {
      dispatch({ type: 'connect' });
    }

    function onDisconnect() {
      dispatch({ type: 'disconnect' });
    }

    function onReceivedOnlineUsers(onlineUsers) {
      dispatch({ type: 'set/onlineUsers', onlineUsers });
    }

    function onReceivedNewOnlineUser(newOnlineUser) {
      dispatch({ type: 'set/newOnlineUser', newOnlineUser });
    }

    function onReceivedNewMessage(newMessage) {
      dispatch({ type: 'set/newMessage', newMessage });
    }

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('send/onlineUsers', onReceivedOnlineUsers);
        socket.on('send/newOnlineUser', onReceivedNewOnlineUser);
        socket.on('send/newMessage', onReceivedNewMessage);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('send/onlineUsers', onReceivedOnlineUsers);
          socket.off('send/newOnlineUser', onReceivedNewOnlineUser);
          socket.off('send/newMessage', onReceivedNewMessage);
        };
      }, []);

    return (
      <SocketContext.Provider value={socketConfig}>
        {children}
      </SocketContext.Provider>
    );
}

SocketProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export function useSocketData() {
  return useContext(SocketContext);
}
