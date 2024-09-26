import { getAllContacts, getContactById, getAllMessagesByContactId, sendMessage } from './ChatActions';

export const chatDefaultValues = {
    allContacts: [],
    contacts: [],
    retrievedInitialContacts: false,
    activeContact: null,
    activeMessages: [],
    lastMessageSent: null,
    sendMessageSuccess: false,
    selectedEmoji: '',
    pagination: {},
    paginationContacts: {},
    error: null,
};

export async function chatReducer(prev, action) {
    switch (action.type) {
        case 'http/get/contacts': {
            const {data, paginationContacts, error} = await getAllContacts(action.payload);

            return {
                ...prev,
                allContacts: data,
                contacts: data,
                retrievedInitialContacts: true,
                paginationContacts,
                error
            };
        }
        case 'http/get/contact': {
            const {data, error} = await getContactById(action.payload);

            return {
                ...prev,
                allContacts: [data, ...prev.allContacts],
                error
            };
        }
        case 'http/get/more-contacts': {
            const {data, paginationContacts, error} = await getAllContacts(action.payload);

            return {
                ...prev,
                allContacts: [...prev.allContacts, ...data],
                paginationContacts,
                error
            };
        }
        case 'http/get/contact/messages': {
            const {data, pagination, error} = await getAllMessagesByContactId(action.payload);

            return {
                ...prev,
                pagination,
                activeMessages: data,
                error
            };
        }
        case 'http/get/contact/more-messages': {
            const { data, pagination, error } = await getAllMessagesByContactId(action.payload);

            return {
                ...prev,
                pagination,
                activeMessages: [...prev.activeMessages, ...data],
                error
            };
        }
        case 'http/post/send-message': {
            const {data, error} = await sendMessage(action.payload);
            if (error) return { ...prev, error };

            prev.activeMessages.unshift(data);
            return {
                ...prev,
                activeMessages: [...prev.activeMessages],
                lastMessageSent: data,
                sendMessageSuccess: true,
                error
            };
        }
        case 'add/received/new-message': {
            prev.activeMessages.unshift(action.newMessage);
            return {
                ...prev,
                activeMessages: [...prev.activeMessages]
            };
        }
        case 'update/contacts': {
            return {
                ...prev,
                contacts: action.contacts
            };
        }
        case 'update/contacts/last-message': {
            const contactIndex = prev.contacts.findIndex(contact => (contact.id === action.newMessage.senderId || contact.id === action.newMessage.receiverId));

            if (contactIndex !== -1) {
                const updatedContact = { ...prev.contacts[contactIndex], lastMessage: action.newMessage };
                const updatedContacts = [
                    updatedContact,
                    ...prev.contacts.slice(0, contactIndex),
                    ...prev.contacts.slice(contactIndex + 1)
                ];

                return {
                    ...prev,
                    allContacts: updatedContacts,
                    contacts: updatedContacts
                };
            }
            return prev;
        }
        case 'set/activeContact': {
            const lastMessage = action.activeContact.lastMessage;
            if (lastMessage) {
                lastMessage.status = 'seen';
            }
            return {
                ...prev,
                activeContact: {...action.activeContact, lastMessage},
            };
        }
        case 'set/selectedEmoji': {
            return {
                ...prev,
                selectedEmoji: new String(action.selectedEmoji)
            }
        }
        case 'clear/sendMessageSuccess': {
            return {
                ...prev,
                sendMessageSuccess: false
            }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}