import React from 'react';
import { useAuth } from 'providers/auth';

const LoggedUserHeaderWrapper = () => {
    const {user} = useAuth();
    const welcomeMessage = `Hi, ${user.username}`;
    const profilePicture = user?.profilePictureUrl || 'src/assets/images/logo.png';

    return (
        <>
            <div className="flex md:hidden justify-center items-center w-full p-3 gap-2">
                <div className="flex items-center relative">
                    <div style={{backgroundImage: 'url(' + profilePicture + ')'}}
                        className={`
                            bg-cover
                            bg-center 
                            bg-clip-padding
                            float-left
                            rounded-[50%] 
                            w-16 h-16 cursor-pointer 
                            shadow-button
                        `}></div>
                </div>
            </div>
            <div className="hidden md:flex items-center w-full p-3 gap-2">
                <div className="flex items-center relative">
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
                </div>
                <h4 className="text-slate-800 dark:text-zinc-200 font-bold text-base lg:text-xl truncate max-w-[50%]">{welcomeMessage}</h4>
                {/* <div className="flex items-center relative ml-auto">
                    <a className="flex items-center justify-center w-8 h-8 cursor-pointer rounded-[50%] shadow-tiny transition-all 
                                    bg-slate-200
                                    border
                                    border-slate-400
                                    dark:bg-zinc-900
                                    dark:border-slate-700
                                    hover:brightness-90">
                        <svg className="size-6 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </a>
                </div>
                <div className="flex items-center relative">
                    <a className="flex items-center justify-center w-8 h-8 cursor-pointer rounded-[50%] shadow-tiny transition-all
                                    bg-slate-200
                                    border
                                    border-slate-400
                                    dark:bg-zinc-900
                                    dark:border-slate-700
                                    hover:brightness-90">
                        <svg className="size-5 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </a>
                </div> */}
            </div>
        </>
    )
};

export default LoggedUserHeaderWrapper;