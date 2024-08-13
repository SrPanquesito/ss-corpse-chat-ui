import React from 'react';
import ConversationHeaderWrapper from './components/ConversationHeaderWrapper';
import ConversationAreaWrapper from './components/ConversationAreaWrapper';
import SendMessageWrapper from './components/SendMessageWrapper';

const MainChatWrapper = () => {
    return (
        <section className="flex flex-col justify-between items-center grow h-screen shadow">
            <ConversationHeaderWrapper />
            <ConversationAreaWrapper />
            <SendMessageWrapper />
        </section>
    )
}

export default MainChatWrapper;