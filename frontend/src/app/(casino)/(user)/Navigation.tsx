"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNavigation() {

    const pathname = usePathname();

    

    return (
        <div>
        {/* <div className={`${(pathname === '/deposit' || pathname === '/withdraw') ? '' : 'hidden'}`}> */}
            <h1 className="text-3xl font-semibold text-custom-gray-500">{pathname === '/profile' ? 'Details' : (pathname.includes('/transactions') && 'Transactions')}</h1>

            <div className="flex flex-row text-white py-6">
            <ul className="flex flex-row bg-custom-gray-800 gap-1 rounded p-1 text-sm md:text-base
            w-full md:w-fit">
                <Link className={`w-full px-6 py-2 rounded text-center
                ${pathname === '/profile' ? 'bg-custom-gray-600' : 'hover:bg-custom-gray-700'}`}
                href="/profile">
                    Paskyra
                </Link>
                <Link className={`w-full px-6 py-2 rounded text-center 
                ${pathname.includes('/transactions') ? ' bg-custom-gray-600 ' : ' hover:bg-custom-gray-700 '}`}
                href="/profile/transactions">
                    Statymai
                </Link>
            </ul>
        </div>

        <span className="w-full block h-px bg-custom-gray-500"></span>
        </div>
    );
}