import React from 'react';
import { useSettings, useDispatchSettings } from 'providers/settings';

const ButtonDarkmode = () => {
    const settings = useSettings();
    const dispatchSettings = useDispatchSettings();

    const toggleDarkmode = (e) => {
        e.preventDefault();
        let action = settings.darkmode ? 'disable' : 'enable';
        dispatchSettings({type: 'darkmode/' + action});
    };

    return (
        <button
            className="relative w-14 h-7 border rounded-full transition-all
            shadow bg-white border-zinc-300
            dark:bg-slate-800 dark:border-slate-700 dark:shadow-slate-800"
            type="button"
            onClick={toggleDarkmode}
        >
            <div
                className={`flex items-center justify-center
                absolute top-0 bottom-0 w-7 h-7 my-auto mx-0 rounded-full transition-all 
                shadow-button bg-yellow-50 dark:bg-slate-700 dark:shadow-slate-800 ` + 
                (settings.darkmode ? 'right-0' : 'right-1/2')}
            >
                <i className="text-orange-300 dark:text-slate-400">
                    { settings.darkmode ?
                        (
                            <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        ) : (
                            <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        )
                    }
                </i>
            </div>
        </button>
    );
}

export default ButtonDarkmode;