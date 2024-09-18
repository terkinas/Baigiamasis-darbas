"use client"
import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useModal } from "@/hooks/useModal";


export default function WithdrawCryptoLayout({ children }: { children: React.ReactNode }) {

    const { user } = useUser() ?? { user: null };
    const { toggleModal, openModal } = useModal();

    if (!user) {
        toggleModal('authentication')
        openModal()
        redirect('/withdraw')
    }

    return (
        <div className="py-6">
            <Link className="text-custom-gray-400 flex flex-row gap-1 items-center" href="/deposit"> <IoChevronBackOutline className="text-lg" /> Back</Link>

            {children}
        </div>
    )
}