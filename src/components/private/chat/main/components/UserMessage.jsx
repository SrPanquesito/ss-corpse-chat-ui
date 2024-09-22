import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useChat } from 'providers/chat';
import moment from 'moment';
moment().format();

const UserMessage = ({id, content, date, previewImageUrl}) => {
    const refRender = useRef();
    const chat = useChat();

    useEffect(() => {
        if (chat.lastMessageSent?.id === id) {
            // Focus scroll view on last message sent
            refRender?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat.lastMessageSent]);

    return (
        <div ref={refRender}
            className="flex flex-col items-end max-w-[70%] md:max-w-[75%] self-end gap-1">
            <div className="
                relative
                p-2
                rounded-xl
                shadow-tiny 
                bg-sky-700 
                text-zinc-100 
                shadow-zinc-700
                dark:bg-gray-800
                dark:text-slate-400
                dark:shadow-gray-900 
                ">
                    { (previewImageUrl && content) && (<>
                        <img src={previewImageUrl} className='md:max-w-md rounded-md'></img>
                        <p className="text-sm pt-2">{content}</p>
                    </>)
                    }
                    { (previewImageUrl && !content) && <img src={previewImageUrl} className='md:max-w-md rounded-md'></img> }
                    { (!previewImageUrl && content) && <p className="text-sm">{content}</p> }
            </div>
            <span className="
                pr-1
                font-normal 
                text-xs
                text-gray-500
                dark:text-gray-600
                ">
                {moment(date).calendar()}
            </span>
        </div>
    )
}

UserMessage.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string,
    date: PropTypes.string.isRequired,
    previewImageUrl: PropTypes.string
}

export default UserMessage;