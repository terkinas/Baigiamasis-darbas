"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PaymentsNavigation() {

    const pathname = usePathname();

    

    return (
        <div>
        {/* <div className={`${(pathname === '/deposit' || pathname === '/withdraw') ? '' : 'hidden'}`}> */}
            <h1 className="text-3xl font-semibold text-custom-gray-500">{pathname.includes('/deposit') ? 'Deposit' : (pathname.includes('/withdraw') && 'Withdraw')}</h1>

            <div className="flex flex-row text-white py-6">
            <ul className="flex flex-row bg-custom-gray-800 gap-1 rounded p-1 text-sm md:text-base
            w-full md:w-fit">
                <Link className={`w-1/2 px-6 py-2 rounded text-center
                ${pathname.includes('/deposit') ? 'bg-custom-gray-600' : 'hover:bg-custom-gray-700'}`}
                href="/deposit">
                    Deposit
                </Link>
                <Link className={`w-1/2 px-6 py-2 rounded text-center 
                ${pathname.includes('/withdraw') ? 'bg-custom-gray-600' : 'hover:bg-custom-gray-700'}`}
                href="/withdraw">
                    Withdraw
                </Link>
            </ul>
        </div>

        <span className="w-full block h-px bg-custom-gray-500"></span>
        </div>
    );
}