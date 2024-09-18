import { Server } from "socket.io";
import { ORIGIN_DOMAIN } from ".";
import { getServerInstance } from "./serverInstance";

let io: Server

export default function socketConfig() {
    const server = getServerInstance();

    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            // origin: 'https://betitfy.com',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
    });
}

export function getSocketInstance() {
    return io;
}
