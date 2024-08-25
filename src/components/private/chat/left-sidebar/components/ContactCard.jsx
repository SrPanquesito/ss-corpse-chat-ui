import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSocketData } from 'providers/socket';
import { useAuth } from 'providers/auth';
import logo from 'assets/images/logo.png';
import moment from 'moment';
moment().format();

const ContactCard = ({id, username, profilePictureUrl, onClick, activeContactId, lastMessage}) => {
    const profilePicture = profilePictureUrl || logo;
    const auth = useAuth();
    const socketData = useSocketData();
    const [isOnline, setIsOnline] = useState(false);
    const msg = {
        text: lastMessage?.text || '',
        imageUrl: lastMessage?.imageUrl || '',
        status: lastMessage?.status || '',
        createdAt: lastMessage?.createdAt || '',
        senderId: lastMessage?.senderId || '',
    };

    useEffect(() => {
        const online = socketData.onlineUsers.some((user) => user.id === id);
        setIsOnline(online);
    }, [socketData.onlineUsers]);

    function isLoggedUserTheSender () {
        return msg.senderId === auth.user?.id
    }

    function RenderLastMessage () {
        if (msg.imageUrl) {
            return (
                <span className="text-gray-500 font-normal text-xs truncate">
                    {isLoggedUserTheSender() ? 'You sent an image' : username + ' sent an image'}
                </span>
            )
        } else if (msg.text) {
            return (
                <span className="text-gray-500 font-normal text-xs truncate">
                    {isLoggedUserTheSender() ? 'You sent a message' : username + ' sent a message'}
                </span>
            )
        } else {
            return (
                <span className="text-gray-500 font-normal text-xs truncate">
                    No messages
                </span>
            )
        }
    }

    return (
        <div data-testid={`contact-button-${id}`}
            role="button"
            onClick={onClick}
            className={`
                ${id === activeContactId ? 'border-l-4 border-sky-500 bg-slate-200 dark:bg-slate-700 ' : ' '}
                ${(msg.status === 'unseen') ? 'bg-blue-200 dark:bg-slate-900 ' : ' '}
                flex items-center w-full relative
                p-3 gap-2 
                cursor-pointer
                hover:bg-slate-200
                dark:hover:bg-slate-700
                transition-all
            `}>
            <div className="flex items-center relative">
                <div role="img"
                    style={{backgroundImage: 'url(' + profilePicture + ')'}}
                    className={`
                        bg-cover
                        bg-center 
                        bg-clip-padding
                        float-left
                        rounded-[50%] 
                        w-12 h-12 cursor-pointer 
                        shadow-button
                    `}></div>
                { isOnline &&
                    <div role="status" className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-[50%] border-2 border-white"></div>
                }
            </div>
            <div className="flex flex-col justify-center w-6 md:w-3/4">
                <h4 className="text-slate-700 dark:text-gray-300 font-normal text-sm truncate dark:text-gray-300">{username}</h4>
                <div className="flex items-center w-full gap-2 truncate">
                    <RenderLastMessage />
                    {msg.createdAt && <span className="text-gray-500 font-bold text-xs">•</span>}
                    <span className="text-gray-500 font-normal text-xs truncate">
                        {msg.createdAt ? moment(msg.createdAt).fromNow() : ''}
                    </span>
                </div>
            </div>
        </div>
    )
}

ContactCard.propTypes = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profilePictureUrl: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    activeContactId: PropTypes.string,
    lastMessage: PropTypes.object
}

export default ContactCard