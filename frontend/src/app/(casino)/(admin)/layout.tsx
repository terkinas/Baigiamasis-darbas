"use client"

import { getUserRole } from "@/lib/clientRequests";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)

    const pathname = usePathname();

    useEffect(() => {
        console.log('welcome to admin layout')
        fetchUserRole()
    }, []);

    const fetchUserRole = async () => {
        const response = await getUserRole()
        console.log('response', response)
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
     
            <div className="w-full lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10">
                    {/* <div className={`${(pathname === '/deposit' || pathname === '/withdraw') ? '' : 'hidden'}`}> */}
                        <h1 className="text-3xl font-semibold text-custom-gray-500">{pathname.includes('/deposit') ? 'Marketplace' : (pathname.includes('/withdraw') && 'Withdraw')}</h1>

                        <div className="flex flex-row text-white py-6">
                        <ul className="flex flex-row bg-custom-gray-800 gap-1 rounded p-1 text-sm md:text-base
                        w-full md:w-fit">
                            <Link className={`w-full px-6 py-2 rounded text-center
                            ${pathname.includes('/users') ? 'bg-custom-gray-600' : 'hover:bg-custom-gray-700'}`}
                            href="/admin/users">
                                Users
                            </Link>

                            <Link className={`w-full px-6 py-2 rounded text-center
                            ${pathname.includes('/transactions') ? 'bg-custom-gray-600' : 'hover:bg-custom-gray-700'}`}
                            href="/admin/transactions">
                                Transactions
                            </Link>


                            <Link className={`w-full px-6 py-2 rounded text-center
                            ${pathname.includes('/wallets') ? 'bg-custom-gray-600' : 'hover:bg-custom-gray-700'}`}
                            href="/admin/wallets">
                                Wallets
                            </Link>

                            <Link className={`w-full px-6 py-2 rounded text-center
                            ${pathname.includes('/messages') ? 'bg-custom-gray-600' : 'hover:bg-custom-gray-700'}`}
                            href="/admin/messages">
                                Messages
                            </Link>
                    
                        </ul>
                    </div>

                    <span className="w-full block h-px bg-custom-gray-500"></span>
                </div>



            {children}
        </>
    );
}