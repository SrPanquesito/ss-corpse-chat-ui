import React from 'react';
import './ComponentStyles.css';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatchAbsolute } from 'providers/absolute';
import logo from 'assets/images/logo.png';

const MessageInput = ({id, placeholder, value, onChangeHandler, onEnterHandler}) => {
    const dispatchAbsolute = useDispatchAbsolute();
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.current.style.height = '0px';
            const scrollHeight = textAreaRef.current.scrollHeight;
      
            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            if (scrollHeight < 200) {
                textAreaRef.current.style.height = scrollHeight + 'px';
            } else {
                textAreaRef.current.style.height = '200px';
            }
        }
    }, [textAreaRef.current, value]);

    const toggleEmojiPicker = () => {
        dispatchAbsolute({ type: 'emojipicker/toggle' });
    };

    const onKeyDownPrehandler = (e) => {
        // Enter key pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onEnterHandler(e);
        }
    };

    return (
        <div className="flex items-center relative">
            <textarea className="w-full pr-9 pl-3
                border-solid 
                border-slate-400
                rounded-2xl 
                dark:border-solid dark:border-slate-700
                dark:shadow-slate-800
                text-sm text-gray-600 placeholder:text-gray-400 
                dark:text-gray-400 dark:placeholder:text-gray-700
                bg-slate-200
                dark:bg-zinc-900
                caret-sky-600
                dark:caret-sky-800
                focus:ring-sky-100
                dark:focus:ring-sky-800
                focus:outline-none
                resize-none
                hidden-scrollbar"
                name={id}
                ref={textAreaRef}
                placeholder={placeholder}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownPrehandler}
                value={value}
            ></textarea>
            <div className="absolute right-3 cursor-pointer hover:brightness-125" onClick={toggleEmojiPicker}>
                <img src={logo}
                    role="img"
                    className="size-6"
                    alt="" />
            </div>
        </div>
    )
}

MessageInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    onEnterHandler: PropTypes.func.isRequired
}

export default MessageInput