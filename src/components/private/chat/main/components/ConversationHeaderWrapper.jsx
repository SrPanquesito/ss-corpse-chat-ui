import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from 'providers/chat';
import ButtonDarkmode from 'components/ButtonDarkmode';
import { useSocketData } from 'providers/socket';
import { useAuth, useDispatchAuth } from 'providers/auth';
import { useDispatchAbsolute } from 'providers/absolute';
import logo from 'assets/images/logo.png';
import { socket } from 'utils/socket';
import { ROUTES } from 'utils/constants';

const ConversationHeaderWrapper = () => {
    const chat = useChat();
    const socketData = useSocketData();
    const profilePicture = chat.activeContact?.profilePictureUrl || logo;
    const [isOnline, setIsOnline] = useState(false);
    const auth = useAuth();
    const dispatchAuth = useDispatchAuth();
    const dispatchAbsolute = useDispatchAbsolute();
    const navigate = useNavigate();

    useEffect(() => {
        if (chat.activeContact && socketData.onlineUsers) {
            const online = socketData.onlineUsers.some((user) => user.id === chat.activeContact?.id);
            setIsOnline(online);
        }
    }, [chat.activeContact, socketData.onlineUsers]);

    const onLogoutHandler = () => {
        socket.timeout(5000).emit('logout', auth.user.id);
        dispatchAuth({ type: 'auth/logout' });
        dispatchAbsolute({ type: 'notificationalert/show', notificationAlertOptions: {
            type: 'warning',
            message: 'Logged out successfully'
        }});
        dispatchAbsolute({ type: 'cleanup' });
        navigate(ROUTES.LOGIN_ROUTE, { replace: true });
    };

    return (
        <nav className="flex justify-between items-center w-full shadow pt-7 pb-3 px-3 md:p-3 bg-zinc-100 dark:bg-gray-800 dark:border-r dark:border-b dark:border-slate-700">
            <div className="block flex items-center w-0 md:w-2/3 h-full gap-2">
                <div className="relative">
                    <div style={{backgroundImage: 'url(' + profilePicture + ')'}}
                        className={`
                            bg-cover
                            bg-center 
                            bg-clip-padding
                            float-left
                            rounded-[50%] 
                            w-14 h-14 cursor-pointer 
                            shadow-button
                        `}></div>
                    { isOnline && 
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-[50%] border-2 border-white"></div>
                    }
                </div>
                <div className="flex items-center relative md:w-full h-full">
                    <h4 className="text-slate-800 dark:text-zinc-200 font-semibold text-base lg:text-lg truncate max-w-[75%] cursor-pointer">
                        {chat.activeContact?.username || ''}
                    </h4>
                    <span className={(isOnline ? 'text-green-500 dark:text-green-700' : 'text-gray-400 dark:text-gray-500') + ' absolute bottom-0 text-xs font-normal truncate'}>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-end w-full md:w-1/3 h-full gap-2">
                <ButtonDarkmode />
                {/* <svg className="size-9 transition-all
                        text-sky-700
                        cursor-pointer
                        hover:text-sky-600
                        dark:text-sky-600
                        dark:hover:text-sky-700
                        " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg> */}
                <a onClick={onLogoutHandler}
                    className="flex items-center justify-center 
                                    cursor-pointer rounded-md
                                    shadow-tiny transition-all
                                    z-30
                                    max-w-32 
                                    gap-1
                                    py-1
                                    pl-1
                                    pr-2
                                    bg-slate-200
                                    border
                                    border-slate-400
                                    dark:bg-zinc-900
                                    dark:border-slate-700
                                    hover:brightness-75">
                    <svg className="size-6 text-gray-600 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Log-out</span>
                </a>
            </div>
        </nav>
    )
}

export default ConversationHeaderWrapper;