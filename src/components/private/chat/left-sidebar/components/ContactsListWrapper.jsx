import React, { useEffect, useRef } from 'react';
import ContactCard from 'components/private/chat/left-sidebar/components/ContactCard';
import { useChat, useDispatchChat } from 'providers/chat';
import { useSocketData } from 'providers/socket';

const ContactsListWrapper = () => {
    const chat = useChat();
    const dispatchChat = useDispatchChat();
    const socketData = useSocketData();
    const contactsEndRef = useRef(null);

    useEffect(() => {
        // Get initial contacts
        if (!chat.contacts?.length && !chat.error && !chat.retrievedInitialContacts) {
            dispatchChat({
                type: 'http/get/contacts',
                payload: {
                    page: 1,
                    pageSize: 20
                }
            });
        }
    }, [chat.contacts, chat.error]);

    useEffect(() => {
        // Get new online user by id and add to contacts list (Mostly for new registered users)
        if (socketData.newOnlineUser && chat.allContacts?.length > 0) {
            if (chat.allContacts.findIndex(contact => contact.id === socketData.newOnlineUser.id) === -1) {
                dispatchChat({ 
                    type: 'http/get/contact',
                    payload: {
                        id: socketData.newOnlineUser.id
                    }
                });
            }
        }
    }, [socketData.newOnlineUser]);

    useEffect(() => {
        // Fetched more contacts, so update contacts list
        if (chat.retrievedInitialContacts && chat.allContacts?.length > 0) {
            dispatchChat({
                type: 'update/contacts',
                contacts: chat.allContacts
            });
        }
        // Set active contact if there are contacts available and no active chat
        if (chat.retrievedInitialContacts && chat.allContacts?.length > 0 && !chat.activeContact) {
            dispatchChat({ type: 'set/activeContact', activeContact: chat.allContacts[0] });
        }
    }, [chat.allContacts]);

    const onContactClick = (contact) => {
        dispatchChat({ type: 'set/activeContact', activeContact: contact });
    };

    const loadMoreContacts = () => {
        dispatchChat({
            type: 'http/get/more-contacts',
            payload: {
                page: chat.paginationContacts.currentPage + 1,
                pageSize: chat.paginationContacts.pageSize
            }
        });
    };

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        let isAtBottom = (scrollHeight - clientHeight - 200) <= scrollTop;

        if (isAtBottom && chat.paginationContacts?.currentPage < chat.paginationContacts?.totalPages) {
            loadMoreContacts();
        }
    };

    return (
        <div className="w-full h-full overflow-x-hidden overflow-y-auto"
            onScroll={handleScroll}
            ref={contactsEndRef}
            data-testid="contacts-list-wrapper"
        >
            {
                chat.contacts && chat.contacts.length > 0 ? chat.contacts.map((contact) => 
                    <ContactCard
                        key={contact.id}
                        id={contact.id}
                        activeContactId={chat.activeContact?.id}
                        username={contact.username}
                        profilePictureUrl={contact.profilePictureThumbnailUrl || contact.profilePictureUrl}
                        lastMessage={contact.lastMessage}
                        onClick={() => onContactClick(contact)}
                    />
                ) :
                    <span className="p-3
                        font-normal 
                        text-sm
                        text-gray-500
                    ">
                        No contacts found.
                    </span>
            }
        </div>
    )
};

export default ContactsListWrapper;