import React, { useEffect } from 'react';
import { useChat, useDispatchChat } from 'providers/chat';
import { useAuth } from 'providers/auth';
import UserMessage from './UserMessage';
import ContactMessage from './ContactMessage';
import { useSocketData } from 'providers/socket';
import { useDispatchAbsolute } from 'providers/absolute';

const ConversationAreaWrapper = () => {
    const auth = useAuth();
    const chat = useChat();
    const dispatchChat = useDispatchChat();
    const socketData = useSocketData();
    const dispatchAbsolute = useDispatchAbsolute();

    useEffect(() => {
        if (chat.activeContact?.id) {
            dispatchChat({
                type: 'http/get/contact/messages',
                payload: {
                    id: chat.activeContact.id
                }
            });
        }
    }, [chat.activeContact?.id]);

    useEffect(() => {
        if (socketData.newMessage) {
            // Show new message in current conversation
            if (chat.activeContact?.id === socketData.newMessage.senderId
                && auth.user?.id === socketData.newMessage.receiverId) {
                dispatchChat({
                    type: 'add/received/new-message',
                    newMessage: socketData.newMessage
                });
                dispatchChat({ type: 'update/contacts/last-message', newMessage: {
                    ...socketData.newMessage,
                    status: 'seen'
                }})
            }
            // Show new message notification from another conversation
            if (auth.user?.id === socketData.newMessage.receiverId
                && chat.activeContact?.id !== socketData.newMessage.senderId) {
                dispatchAbsolute({ type: 'notificationalert/show', notificationAlertOptions: {
                    type: 'info',
                    message: 'New message received'
                }});
                // Update contact list with new message
                dispatchChat({ type: 'update/contacts/last-message', newMessage: socketData.newMessage });
            }
        }
    }, [socketData.newMessage]);

    return (
        <div className="flex flex-col-reverse justify-start w-full h-full overflow-x-hidden overflow-y-auto px-3 py-4 gap-2">
            {
                chat.activeMessages && chat.activeMessages.length > 0 ? chat.activeMessages.map((msg) => {
                    if (msg.senderId === chat.activeContact.id) {
                        return (
                            <ContactMessage
                                id={msg.id}
                                key={msg.id}
                                content={msg.text}
                                previewImageUrl={msg.thumbnailUrl || msg.imageUrl}
                                date={msg.createdAt}
                                profilePictureUrl={chat.activeContact.profilePictureThumbnailUrl || chat.activeContact.profilePictureUrl}
                            />
                        )
                    }
                    if (msg.senderId === auth.user.id) {
                        return (
                            <UserMessage
                                id={msg.id}
                                key={msg.id}
                                content={msg.text}
                                previewImageUrl={msg.thumbnailUrl || msg.imageUrl}
                                date={msg.createdAt}
                            />
                        )
                    }
                }) :
                    <span className="p-3
                        font-normal 
                        text-sm
                        text-gray-500
                    ">
                        No messages found for this contact.
                    </span>
            }
        </div>
    )
}

export default ConversationAreaWrapper;