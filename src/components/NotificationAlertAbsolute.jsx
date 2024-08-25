import React from 'react';
import { useEffect } from 'react';
import { useAbsolute, useDispatchAbsolute } from 'providers/absolute';

const NotificationAlertAbsolute = () => {
    const { showNotificationAlert, notificationAlertOptions } = useAbsolute();
    const dispatch = useDispatchAbsolute();

    useEffect(() => {
        if (showNotificationAlert) {
            setTimeout(() => {
                dispatch({ type: 'notificationalert/hide' });
            }, notificationAlertOptions.timeout);
        }
    }, [showNotificationAlert]);

    const success = 'bg-green-500 text-green-100';
    const error = 'bg-red-500 text-red-100';
    const warning = 'bg-yellow-500 text-yellow-100';
    const info = 'bg-blue-500 text-blue-100';

    const successIcon = (
        <svg className="size-5" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
        </svg>
    );
    const errorIcon = (
        <svg className="size-5" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
        </svg>
    );
    const warningIcon = (
        <svg className="size-5" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        </svg>
    );
    const infoIcon = (
        <svg className="size-5" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div 
            className={`
                ${showNotificationAlert ? 'z-50 ' : '-z-10 '}
                absolute right-2 top-2
            `}
        >
            <div role="alertdialog"
                className={`
                    ${notificationAlertOptions.type === 'success' && success}
                    ${notificationAlertOptions.type === 'error' && error}
                    ${notificationAlertOptions.type === 'warning' && warning}
                    ${notificationAlertOptions.type === 'info' && info}
                    ${showNotificationAlert ? 'visible opacity-100 ' : 'invisible opacity-0 '}
                    flex
                    justify-center items-center
                    p-3
                    w-60 md:w-96
                    max-h-16
                    rounded-xl
                    shadow-tiny
                    dark:shadow-gray-900
                    dark:border
                    dark:border-slate-700
                    transition-opacity
                `}>
                    <div className="flex items-center justify-center w-1/6">
                        {notificationAlertOptions.type === 'success' && successIcon}
                        {notificationAlertOptions.type === 'error' && errorIcon}
                        {notificationAlertOptions.type === 'warning' && warningIcon}
                        {notificationAlertOptions.type === 'info' && infoIcon}
                    </div>
                    <div className="flex flex-row items-center gap-2 w-5/6">
                        <h1 className="
                            font-semibold
                            text-sm
                        ">
                            {notificationAlertOptions.type === 'success' && 'Success:'}
                            {notificationAlertOptions.type === 'error' && 'Error:'}
                            {notificationAlertOptions.type === 'warning' && 'Warning:'}
                            {notificationAlertOptions.type === 'info' && 'Info:'}
                        </h1>
                        <span className="
                            font-normal 
                            text-xs
                            text-ellipsis
                            overflow-hidden
                        ">
                            {notificationAlertOptions.message}
                        </span>
                    </div>
            </div>
        </div>
    )
}

export default NotificationAlertAbsolute;