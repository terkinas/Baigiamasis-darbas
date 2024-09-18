"use client"

import { UserContext, UserContextProps } from "@/context/userContext";
import { useContext } from "react";


export const useUser = (): UserContextProps | null => {
    try {
        const context = useContext(UserContext);
        if (!context) {
            throw new Error("useUser must be used within a UserProvider");
        }
        return context;
    } catch (error) {
        console.error(error);
        return null;
    }
};