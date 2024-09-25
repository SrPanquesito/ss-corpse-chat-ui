// More information: https://socket.io/how-to/use-with-react
import { io } from 'socket.io-client';
import { URLS } from 'utils/constants';

// const SOCKET_URL = import.meta.env.VITE_CORPSE_SOCKET_BASE_URL;
// "undefined" means the URL will be computed from the `window.location` object
// const URL = import.meta.env.NODE_ENV === 'production' ? undefined : SOCKET_URL;

export const socket = io(URLS.SOCKET_BASE_URL, {
    autoConnect: false,
    transports: ["websocket", "polling"]
});