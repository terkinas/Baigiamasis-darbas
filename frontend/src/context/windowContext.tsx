"use client"

import { createContext, useEffect, useState } from "react";

interface WindowContextProps {
    isMobile: boolean;
}

export const WindowContext = createContext<WindowContextProps | null>(null);

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [width, setWidth] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);

            // 
    
            const newWidth = window.innerWidth;
            setWidth(newWidth);

            // 

            if (newWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [width, setIsMobile, isMobile]);

    return (
        <WindowContext.Provider value={{ isMobile }}>
            {children}
        </WindowContext.Provider>
    );
};
