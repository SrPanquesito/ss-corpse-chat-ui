import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useAbsolute } from 'providers/absolute';

const ImagePreviewDisplayAbsolute = () => {
    const refWrapper = useRef();
    const { showImagePreviewDisplay, positionCoordsImagePreviewDisplay: positionCoords, dataImagePreviewDisplay: images } = useAbsolute();
    const [ position, setPosition ] = useState([0,0]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => {
          document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    useEffect(() => {
        console.log(images);
    }, [images]);

    useEffect(() => {
        setPosition([positionCoords[0] - 75, positionCoords[1] - 100]);
    }, [showImagePreviewDisplay]);

    const handleClickOutside = event => {
        if (refWrapper.current && !refWrapper.current.contains(event.target)) {
            if (refWrapper.current.clientHeight > 0) {
                // Clicked outside and picker is visible in UI
                // dispatchAbsolute({ type: 'imagepreviewdisplay/hide' });
            }
        }
    };

    return (
        <div ref={refWrapper}
            className="absolute z-50"
            style={{
                left: position[0],
                top: position[1],
                tranform: 'translateX(-50%)',
                transform: 'translateY(-50%)',
            }}
        >
            <div className={`${showImagePreviewDisplay ? 'block ' : 'hidden '}
                w-auto md:w-auto
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
                dark:border
                dark:border-slate-700

                before:content-['']
                before:absolute
                before:top-full
                before:left-[40%]
                before:w-0
                before:border-t-[12px]
                before:border-t-sky-700
                before:border-l-[16px]
                before:border-l-transparent
                before:border-r-[16px]
                before:border-r-transparent
                before:dark:border-t-gray-800
                `}>
                    {
                        images && images.length > 0 ? images.map((file) => (
                            <div key={images.indexOf(file)}
                                className="flex flex-row justify-center items-center">
                                <div style={{backgroundImage: 'url(' + file + ')'}}
                                    className={`
                                        border
                                        border-sky-200
                                        bg-cover
                                        bg-center 
                                        bg-clip-padding
                                        float-left
                                        rounded-md
                                        w-32 h-32 md:w-32 md:h-32 cursor-pointer 
                                        shadow-button
                                        dark:border-sky-600
                                    `}></div>
                            </div>
                        )) : (
                            <span className="p-3
                                font-normal 
                                text-xs
                                text-slate-300
                                dark:text-gray-400
                            ">
                                Loading images...
                            </span>
                        )
                    }
            </div>
        </div>
    );
};

export default ImagePreviewDisplayAbsolute;