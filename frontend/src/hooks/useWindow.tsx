"use client"

import { WindowContext } from "@/context/windowContext";
import { useContext } from "react";

const useWindow = () => {
    try {
        const context = useContext(WindowContext);
        if (!context) {
            throw new Error("useWindow must be used within a WindowProvider");
        }
        return context;
    } catch (error) {
        console.error(error);
    }
}

export default useWindow;