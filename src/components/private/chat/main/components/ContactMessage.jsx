import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSocketData } from 'providers/socket';
import logo from 'assets/images/logo.png';
import moment from 'moment';
moment().format();

const ContactMessage = ({id, content, date, profilePictureUrl, previewImageUrl}) => {
    const profilePicture = profilePictureUrl || logo;
    const refRender = useRef();
    const socketData = useSocketData();

    useEffect(() => {
        if (socketData.newMessage?.id === id) {
            // Focus scroll view on last message sent
            refRender?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [socketData.newMessage]);

    return (
        <div ref={refRender}
            className="flex flex-row gap-2">
            <img src={profilePicture}
                className="object-cover rounded-[50%] w-7 h-7 shadow-button cursor-pointer self-end mb-6"
                alt="" />
            <div className="flex flex-col items-start max-w-[70%] md:max-w-[75%] self-start gap-1">
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
                    pl-1
                    font-normal 
                    text-xs
                    text-gray-500
                    dark:text-gray-600
                    ">
                    {moment(date).calendar()}
                </span>
            </div>
        </div>
    )
}

ContactMessage.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string,
    date: PropTypes.string.isRequired,
    profilePictureUrl: PropTypes.string,
    previewImageUrl: PropTypes.string
}

export default ContactMessage