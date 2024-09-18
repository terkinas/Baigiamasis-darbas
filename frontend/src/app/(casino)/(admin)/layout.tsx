"use client"

import { getUserRole } from "@/lib/clientRequests";
import { useEffect, useState } from "react";

export default function AdminLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        
        fetchUserRole()
    }, []);

    const fetchUserRole = async () => {
        const response = await getUserRole()
        
        if (response === 'ADMIN') {
            setIsAdmin(true)
        } else if (response === 'USER') {
            
        }
    }



    if (!isAdmin) {
        return null
    }

    return (
        <>
            {children}
        </>
    );
}