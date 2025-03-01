import { io } from "socket.io-client";
import { backendUrl } from "./constraint";

// Replace with your backend URL
const SOCKET_URL = backendUrl;

const socket = io(SOCKET_URL, { autoConnect: false });

export default socket;
