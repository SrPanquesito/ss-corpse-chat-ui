import React, { useEffect } from 'react';
import './ChatLayout.css';
import { authStatusFromCookies } from 'providers/auth/AuthActions';
import { useDispatchAuth } from 'providers/auth';
import { ChatProvider } from 'providers/chat';
import LeftSidebarChatWrapper from 'components/private/chat/left-sidebar/LeftSidebarChatWrapper';
import MainChatWrapper from 'components/private/chat/main/MainChatWrapper';
import EmojiPickerAbsolute from 'components/EmojiPickerAbsolute';
import ImagePreviewDisplayAbsolute from 'components/ImagePreviewDisplayAbsolute';
import { SocketProvider } from 'providers/socket';
import { socket } from 'utils/socket';

const ChatLayout = () => {
    const { user, isAuthenticated } = authStatusFromCookies();
    const dispatch = useDispatchAuth();

    useEffect(() => {
        dispatch({ type: 'manual/setup', user, isAuthenticated });
        socket.timeout(5000).emit('add/onlineUser', user);
    }, [isAuthenticated]);

    // Connect socket only when ChatLayout is active
    useEffect(() => {
        socket.connect();

        return () => {
          socket.disconnect();
        };
    }, []);

    return (
        <ChatProvider>
            <SocketProvider>
                <main className="flex justify-between items-center w-full h-full">
                    <LeftSidebarChatWrapper />
                    <MainChatWrapper />
                    <EmojiPickerAbsolute />
                    <ImagePreviewDisplayAbsolute />
                    {/* Right sidebar (More contact information). Will be implemented in the future. */}
                </main>
            </SocketProvider>
        </ChatProvider>
    );
}

export default ChatLayout;