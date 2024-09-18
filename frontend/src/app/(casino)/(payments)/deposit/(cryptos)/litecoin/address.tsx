"use client"

import { getCryptoAddressBySymbol } from "@/lib/clientRequests";
import { useEffect, useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";

export default function LitecoinDepositAddressWindow() {

    const [address, setAddress] = useState<string | null>(null);

    

    const fetchMessages = async () => {
        const address = await getCryptoAddressBySymbol('LTC');
        setAddress(address);
        
    }

    useEffect(() => {
        fetchMessages();
        
    }, []);

    return (
        <div className="w-full pt-6">
        <div className="flex flex-col w-full py-6 gap-2 px-4 md:px-8
        shadow-lg bg-custom-gray-700 rounded">
          <h5 className="flex flex-row gap-2 items-center"><BsWallet2 className="text-custom-gray-300" /> Wallet address</h5>

          <p className="uppercase text-xs text-custom-gray-400">Your litecoin deposit address</p>
          <div className="flex flex-row gap-2 items-center justify-between
          bg-custom-gray-900 hover:bg-custom-gray-800 cursor-pointer px-4 rounded py-0.5 md:py-0
          border border-custom-gray-600">
            <span className="text-custom-gray-100 text-xs md:text-base">{address ? address : ''}</span>
            <button className="flex flex-row gap-1 items-center p-2 rounded text-custom-gray-400 text-xs md:text-sm">
              <IoCopyOutline />
              <span>Copy</span>
            </button>
          </div>
          <p className="text-xs text-center text-custom-gray-400">Upon confirmation of the transaction, you{"'"}ll receive your coins along with a <span className="text-custom-green-500">+13%</span> bonus</p>
        </div>
      </div>
    )
}