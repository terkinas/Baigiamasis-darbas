"use client"

import Link from "next/link";
import BitcoinDepositPage from "./bitcoin/page";
import { IoChevronBackOutline } from "react-icons/io5";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useModal } from "@/hooks/useModal";
import { redirect } from "next/navigation";


export default function DepositCryptoLayout({ children }: { children: React.ReactNode }) {

    const { user } = useUser() ?? { user: null };
    const { toggleModal, openModal } = useModal();

    if (!user) {
        toggleModal('authentication')
        openModal()
        redirect('/deposit')
    }


    return (
        <div className="py-6">
            <Link className="text-custom-gray-400 flex flex-row gap-1 items-center" href="/deposit"> <IoChevronBackOutline className="text-lg" /> Back</Link>

            {children}
        </div>
    )
}