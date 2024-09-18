"use client"

// import dynamic from 'next/dynamic'

import useWindow from "@/hooks/useWindow";
import { Button } from "../ui/Button";
import { IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { useState } from "react";

export default function LiveChatLayout({ children }: { children: React.ReactNode }) {

    const { isMobile } = useWindow() ?? { isMobile: undefined };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        {/* decoy */}
        <div className={`hidden md:block md:relative h-full w-5/6 flex flex-1 flex-row gap-0.5 outline-none items-end md:items-start -translate-x-full md:translate-x-0 transition duration-500 ${isOpen && 'translate-x-0'}
        p-3 border-r-2 min-w-72 max-w-72 h-[calc(100dvh-4rem)] p-3 bg-custom-gray-800 border-r-2`}></div>


        <div className={`fixed z-40 md:fixed w-5/6 md:w-fit flex flex-1 flex-row gap-0.5 outline-none items-end -translate-x-full md:translate-x-0 transition duration-500 ${isOpen && 'translate-x-0'}`}>
            <button className={`absolute w-1/6 right-0 h-full bg-custom-gray-900 transition-opacity
             ${isOpen ? 'opacity-70 duration-500 delay-500 translate-x-full' : 'opacity-0'}`} onClick={() => setIsOpen(false)}>
            </button>
            <div className={`relative lg:block z-30 w-full min-w-72 max-w-72 h-[calc(100svh-4rem)] p-3 bg-custom-gray-800 border-r-2 border-custom-gray-700 ${isMobile && 'min-w-full max-w-full '}`}>
                { children }
            </div>
            {isMobile && <LiveChatToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
            
        </>
    )
    
}

export function LiveChatToggleButton({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Button onClick={() => setIsOpen(!isOpen)} className="relative bottom-16 flex items-center justify-center h-12 w-12 z-40 bg-custom-gray-700 shadow-lg bg-opacity-50">
            <p className="text-lg">{isOpen ? <IoClose /> : <IoChatbox />}</p>
        </Button>
    )
}