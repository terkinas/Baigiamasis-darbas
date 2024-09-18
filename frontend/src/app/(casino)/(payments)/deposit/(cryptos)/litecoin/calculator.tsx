"use client"

import { COIN_TO_USD } from "@/lib/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { FaCalculator } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";

export default function LitecoinCalculator() {

    COIN_TO_USD

    const [coins, setCoins] = useState<any>('')
    const [rateUSD, setRateUSD] = useState<any>('')
    const [cryptoAmount, setCryptoAmount] = useState<any>('')

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd')
            .then(res => res.json())
            .then(data => {
                setRateUSD(data.litecoin.usd)
            })
    }, [])

    function handleConvertion(event: any, inputType: string) {
        
        // setCryptoAmount(Number(coins) / Number(rateUSD))
        // setCoins(Number(cryptoAmount) * Number(rateUSD))

        if (inputType === 'coins') {
            setCoins(event.target.value);
            setCryptoAmount(Number(event.target.value) / Number(rateUSD));
        } else if (inputType === 'cryptoAmount') {
            setCryptoAmount(event.target.value);
            setCoins(Number(event.target.value) * Number(rateUSD));
        }
    }

    return (
        <div className="flex flex-row items-center gap-2 text-sm md:text-base">
            <div className="w-full border border-custom-gray-600 shadow-lg rounded
            flex flex-row items-center bg-custom-gray-900 px-2">
                <GiTwoCoins className="text-custom-yellow-500 text-lg" />
                <input onChange={(e) => setCoins(e.target.value)} 
                onBlur={(e) => handleConvertion(e, 'coins')} 
                value={coins} type="text" className="w-full h-full outline-none p-2 bg-transparent font-light rounded" placeholder="0.00" />
            </div>
            <AiOutlineSwap size={38} className="text-custom-gray-300" />
            <div className="w-full border border-custom-gray-600 shadow-lg rounded
            flex flex-row items-center bg-custom-gray-900 px-2">
                <Image src="/images/payments/litecoin.png" alt="Litecoin" width={16} height={16} className="object-contain" />
                {/* <GiTwoCoins className="text-custom-yellow-500 text-lg" /> */}
                <input onChange={(e) => setCryptoAmount(e.target.value)} 
                onBlur={(e) => handleConvertion(e, 'cryptoAmount')} 
                value={cryptoAmount} type="text" className="w-full h-full outline-none p-2 bg-transparent font-light rounded" placeholder="0.00" />
            </div>
        </div>
    );
}