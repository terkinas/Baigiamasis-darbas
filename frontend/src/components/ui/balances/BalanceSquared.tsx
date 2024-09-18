"use client"

import { UserContextProps } from "@/context/userContext";
import { useUser } from "@/hooks/useUser";
import { IClientUser } from "@/types/client/user.interface";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";

export default function BalanceSquared() {
    const { user } = useUser() as { user: IClientUser };

    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        if (user) {
            setBalance(Math.floor(user.balance.amount * 100) / 100)
        }
    }, [user])

    if (user !== null && user !== undefined) {
        return (
            <p className="h-10 px-4 bg-custom-gray-500 text-custom-gray-100 flex items-center justify-center text-sm font-semibold rounded" ><GiTwoCoins className="text-custom-yellow-500 mr-1" /> {balance && (Number(balance) / 100).toFixed(2)}</p>
        )
    }
}