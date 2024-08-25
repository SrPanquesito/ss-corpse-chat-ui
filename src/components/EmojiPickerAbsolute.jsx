import React, { useRef, useEffect } from 'react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useSettings } from 'providers/settings';
import { useAbsolute, useDispatchAbsolute } from 'providers/absolute';
import { useDispatchChat } from 'providers/chat';

const EmojiPickerAbsolute = () => {
    const refWrapper = useRef();
    const { darkmode } = useSettings();
    const { showEmojiPicker } = useAbsolute();
    const dispatchAbsolute = useDispatchAbsolute();
    const dispatchChat = useDispatchChat();

    /* istanbul ignore next */
    const onEmojiClick = (event) => {
        dispatchChat({ type: 'set/selectedEmoji', selectedEmoji: event.emoji });
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => {
          document.removeEventListener('click', handleClickOutside, false);
        };
      }, []);

    const handleClickOutside = event => {
        if (refWrapper.current && !refWrapper.current.contains(event.target)) {
            if (refWrapper.current.clientHeight > 0) {
                // Clicked outside and picker is visible in UI
                dispatchAbsolute({ type: 'emojipicker/hide' });
            }
        }
    };

    return (
        <div ref={refWrapper}
            id="emoji-picker-absolute"
            className="absolute bottom-14 right-2 md:right-14">
            <EmojiPicker
                open={showEmojiPicker}
                onEmojiClick={onEmojiClick}
                skinTonesDisabled
                theme={darkmode ? Theme.DARK : Theme.LIGHT}
            />
        </div>
    );
};

export default EmojiPickerAbsolute;