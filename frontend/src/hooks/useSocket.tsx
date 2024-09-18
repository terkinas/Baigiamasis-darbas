"use client"

import { SocketContext } from "@/context/socketContext";
import { useContext } from "react";


export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
}