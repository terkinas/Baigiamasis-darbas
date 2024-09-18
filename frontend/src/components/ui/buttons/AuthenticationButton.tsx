"use client"

import { useModal } from "@/hooks/useModal";
import { Button } from "../Button";
import { useUser } from "@/hooks/useUser";
import { UserContextProps } from "@/context/userContext";
import { GiTwoCoins } from "react-icons/gi";
import { useEffect, useState } from "react";
import BalanceSquared from "../balances/BalanceSquared";

export default function AuthenticationButton() {

    const { toggleModal, openModal } = useModal();
    const { user } = useUser() ?? { user: null };

    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (user) {
            setBalance(user.balance.amount)
        }
    }, [user])

    if (user) {
        return (
            <BalanceSquared />
            // <p className="h-10 px-4 bg-custom-gray-500 text-custom-gray-100 flex items-center justify-center text-sm font-semibold rounded" ><GiTwoCoins className="text-custom-yellow-500 mr-1" /> {balance && (Number(balance) / 100).toFixed(2)}</p>
            // <p className="h-10 px-4 bg-custom-gray-500 text-custom-gray-100 flex items-center justify-center text-sm font-semibold rounded" ><GiTwoCoins className="text-custom-yellow-500 mr-1" /> {user.balance.amount && (Number(user.balance.amount) / 100).toFixed(2)}</p>
        )
    }

    return (
        <Button onClick={() => {
            toggleModal('authentication')
            openModal()
        }} variant='secondary' className="shadow md:text-sm bg-custom-green-500 text-white whitespace-nowrap">Sign In</Button>
    )
}