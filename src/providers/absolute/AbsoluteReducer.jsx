const initialDefaultValues = {
    showEmojiPicker: false,
    showImagePreviewDisplay: false,
    dataImagePreviewDisplay: [],
    positionCoordsImagePreviewDisplay: [0, 0],
    showNotificationAlert: false,
    notificationAlertOptions: {
        type: 'info', // success, error, warning, info
        message: 'Holi',
        timeout: 3000,
    }
};

export const absoluteDefaultValues = initialDefaultValues;

export function absoluteReducer(prev, action) {
    switch (action.type) {
        case 'emojipicker/toggle': {
            return {
                ...prev,
                showEmojiPicker: !prev.showEmojiPicker
            };
        }
        case 'emojipicker/hide': {
            return {
                ...prev,
                showEmojiPicker: false
            };
        }
        case 'imagepreviewdisplay/set': {
            return {
                ...prev,
                dataImagePreviewDisplay: action.images
            };
        }
        case 'imagepreviewdisplay/clear': {
            return {
                ...prev,
                dataImagePreviewDisplay: []
            };
        }
        case 'imagepreviewdisplay/show': {
            return {
                ...prev,
                showImagePreviewDisplay: true,
                positionCoordsImagePreviewDisplay: action.positionCoords
            };
        }
        case 'imagepreviewdisplay/hide': {
            return {
                ...prev,
                showImagePreviewDisplay: false
            };
        }
        case 'notificationalert/show': {
            const timeout = action.notificationAlertOptions?.timeout ? action.notificationAlertOptions.timeout : 3000;
            return {
                ...prev,
                showNotificationAlert: true,
                notificationAlertOptions: {...action.notificationAlertOptions, timeout}
            };
        }
        case 'notificationalert/hide': {
            return {
                ...prev,
                showNotificationAlert: false,
                notificationAlertOptions: {}
            };
        }
        case 'cleanup': {
            return {
                ...initialDefaultValues,
                showNotificationAlert: prev.showNotificationAlert,
                notificationAlertOptions: prev.notificationAlertOptions
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}