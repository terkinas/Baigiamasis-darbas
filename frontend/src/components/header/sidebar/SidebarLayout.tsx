"use client"

import { useEffect } from "react";
import Sidebar from "./Sidebar";

export default function SidebarLayout({
    isOpen,
    closeSidebar
  }: Readonly<{
    isOpen: boolean;
    closeSidebar: () => void;
  }>) {

    return (
        <div onClick={() => closeSidebar()} className={`w-full fixed top-16 right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} h-[calc(100svh-4rem)]
        flex justify-end transition duration-500`}>
            {/* <button className={`absolute w-screen h-full bg-custom-gray-900 transition -translate-x-1/2 ${isOpen ? 'bg-opacity-70 duration-500' : 'bg-opacity-0'}`} onClick={() => closeSidebar()}>

            </button> */}

            <button className={`absolute w-1/4 sm:w-2/4 left-0 h-full bg-custom-gray-900 transition-opacity
             ${isOpen ? 'opacity-70 duration-500 delay-500' : 'opacity-0'}`} onClick={() => closeSidebar()}>
            </button>
            <div className="w-3/4 sm:w-2/4 h-full relative bg-custom-gray-800">
                <Sidebar />
            </div>
        </div>
    );
  }