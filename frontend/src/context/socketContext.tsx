"use client"

import { SOCKET_URL } from "@/lib/config";
import { env } from "process";
import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
    socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    const createConnection = () => {
        const server = SOCKET_URL || "http://localhost:8000";
        const newSocket = io(server);
        setSocket(newSocket);
    }

    useEffect(() => {
        if (socket && socket.connected) {
            return;
        }

        if (socket && !socket.connected) {
            socket.connect();
            return;
        }

        createConnection();

        

        return () => {
            if(socket && socket.connected) {
                socket.disconnect();
            }

        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

