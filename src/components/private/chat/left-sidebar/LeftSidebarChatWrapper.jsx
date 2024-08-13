import React, { useState } from 'react';
import SearchInput from 'components/SearchInput';
import ContactsListWrapper from './components/ContactsListWrapper';
import LoggedUserHeaderWrapper from './components/LoggedUserHeaderWrapper';
import { useChat, useDispatchChat } from 'providers/chat';

const LeftSidebarChatWrapper = () => {
    const [searchText, setSearchText] = useState('');
    const chat = useChat();
    const dispatchChat = useDispatchChat();

    const searchInputHandler = (e) => {
        const { value } = e.target;
        setSearchText(value);

        if (chat.allContacts?.length > 0) {
            const filteredItems = chat.allContacts.filter((contact) =>
                contact.username.toLowerCase().includes(value.toLowerCase())
            );
            if (filteredItems.length > 0) {
                dispatchChat({ type: 'update/contacts', contacts: filteredItems });
            } else {
                dispatchChat({ type: 'update/contacts', contacts: [] });
            }
        }
    };

    return (
        <aside className="flex flex-col justify-start items-center w-1/4 h-screen shadow bg-zinc-100 dark:bg-gray-800 dark:border-r dark:border-slate-700">
            <LoggedUserHeaderWrapper />
            <div className="w-full p-2 pb-4">
                <SearchInput
                    id="search-contacts"
                    placeholder="Search for contacts..."
                    value={searchText}
                    onChangeHandler={searchInputHandler}
                />
            </div>
            <ContactsListWrapper />
        </aside>
    )
};

export default LeftSidebarChatWrapper;