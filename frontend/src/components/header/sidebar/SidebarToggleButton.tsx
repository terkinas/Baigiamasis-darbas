"use client"

import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";

export default function SidebarToggleButton() {

    const [isOpen, setIsOpen] = useState(false);

    function closeSidebar() {
        setIsOpen(false);
    }

    return (
        <>
        <button className="p-1" onClick={() => setIsOpen(!isOpen)}>
            <FaBars size={18} className={`${isOpen && 'text-custom-green-500'}`} />
        </button>

        <SidebarLayout closeSidebar={closeSidebar} isOpen={isOpen} />
        </>
    )
}
