"use client"

import { useUser } from "@/hooks/useUser";
import { getWalletsForAdmin, withdrawCryptoFromWalletsBySymbol } from "@/lib/clientRequests";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { BsWallet2 } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import { HiOutlineCash } from "react-icons/hi";
import { IoCopyOutline } from "react-icons/io5";

export default function AdminWalletsPage() {

    const { user } = useUser() ?? { user: null }

    const [wallets, setWallets] = useState<any>([])
    const [users, setUsers] = useState<any>([])
    const [pageNumber, setPageNumber] = useState<number>(1)

    const [cryptoToWithdraw, setCryptoToWithdraw] = useState<string>('BTC')
    const [toAddress, setToAddress] = useState<string>('')

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    useEffect(() => {
        console.log('welcome to sss')
        if (user) {
            getWallets(pageNumber)
        }
    }, [user, pageNumber])


    async function getWallets(pageNumber: number = 1) {
        if (!user) return

        try {
            const response = await getWalletsForAdmin(pageNumber);

            
    
            if (!response) return;
    
            
            setUsers(response);
        } catch (error: any) {
            setUsers(null);
        }
    }

    function withdrawCryptoFromWallets() {
        

        const validSymbols = ['BTC', 'LTC']

        

        if (!validSymbols.includes(cryptoToWithdraw)) {
            
            return
        }

        if (!toAddress || toAddress.length < 1) {
            
            return
        }
        
        const response = withdrawCryptoFromWalletsBySymbol(cryptoToWithdraw, toAddress)
        

    }

    const addLeadingZero = (number: number) => {
        return number < 10 ? '0' + number : number;
      };

    
    if (!users) {
        return null
    }


    return (
        <div className="w-full lg:max-w-[calc(100vw-16rem)] max-w-xl px-4 py-10 md:p-10 text-custom-gray-100">

            {/* withdraw table */}
            <div className="w-full flex flex-col gap-3 max-w-xl mx-auto">
            <div className="w-full pt-6">
                    <div className="flex flex-col w-full py-6 gap-2 px-4 md:px-8
                    shadow-lg bg-custom-gray-700 rounded">
                    <h5 className="flex flex-row gap-2 items-center"><BsWallet2 className="text-custom-gray-300" /> Wallet address</h5>

                    <p className="uppercase text-xs text-custom-gray-400">Your litecoin withdraw address</p>
                    <div className="flex flex-row gap-2 items-center justify-between
                    bg-custom-gray-900 hover:bg-custom-gray-800 cursor-pointer px-4 rounded py-0.5 md:py-0
                    border border-custom-gray-600">
                        {/* <span className="text-custom-gray-100 text-xs md:text-base">1KvW5Y6aC5q4u9JLjgQ9ZbQ4q2</span> */}
                        <input onChange={(e) => setToAddress(e.target.value)} type="text" maxLength={57} 
                        value={toAddress}
                        className="bg-transparent outline-none w-full text-xs md:text-sm " placeholder="Your litecoin wallet address" />
                        <button className="flex flex-row gap-1 items-center p-2 rounded text-custom-gray-400 text-xs md:text-sm">
                        <IoCopyOutline />
                        <span>Paste</span>
                        </button>
                    </div>
                    {/* <p className="text-xs text-center text-custom-gray-400">If enough balance, you{"'"}ll receive your funds in about <span className="text-custom-green-500">10</span> minutes</p> */}

                </div>
            </div>

            <div className="w-full py-6">
                <div className="flex flex-col w-full py-6 gap-4 px-4 md:px-8
                shadow-lg bg-custom-gray-700 rounded">
                <h5 className="flex flex-row gap-2 items-center"><HiOutlineCash className="text-custom-gray-300" /> Withdraw amount</h5>


                <ul className="flex flex-row gap-3 ">
                    <li onClick={() => setCryptoToWithdraw('BTC')} className={`w-fit px-6 py-2 rounded text-center cursor-pointer ${cryptoToWithdraw == 'BTC' ? 'bg-custom-gray-500' : 'bg-custom-gray-900'}`}>
                        BTC
                    </li>
                    <li onClick={() => setCryptoToWithdraw('LTC')} className={`w-fit px-6 py-2 rounded text-center cursor-pointer ${cryptoToWithdraw == 'LTC' ? 'bg-custom-gray-500' : 'bg-custom-gray-900'}`}>
                        LTC
                    </li>
                </ul>


                <div className="w-full flex justify-center">
                    <button onClick={() => withdrawCryptoFromWallets()} className="w-full border border-custom-gray-600 hover:bg-custom-gray-800 right-0 px-6 py-2 text-sm rounded bg-custom-green-500 hover:bg-custom-green-400 text-custom-gray-100">Withdraw</button>
                </div>
                <p className="text-center text-xs md:text-sm text-custom-gray-400">Est. Network Fee  <span className="text-custom-gray-100">0.00$</span></p>
                </div>
            </div>
            </div>
            {/* end of withdrawal */}


            <div className="w-full flex flex-col gap-6 max-w-xl mx-auto">
                <h4 className="text-xl md:text-3xl">Manage Wallets</h4>
                <hr  />
                <p className="text-custom-gray-400">Welcome to the wallets management page. Here you can view and manage user wallets.</p>


                <div>
                    <ul className="flex flex-col gap-4">

                        {users.map((thisUser: any) => (
                                <li key={thisUser.id} className="flex flex-col">
                                    <div className="flex flex-col text-xs">
                                        <span className="text-custom-gray-400">User ID: {thisUser.id}</span>
                                        <span className="text-custom-gray-400">Username: {thisUser.username}</span>
                                        <span className="text-custom-gray-400">Balance: <p className="text-custom-green-500 inline">{thisUser.balance.amount}</p></span>
                                        <h6>Wallets:</h6>
                                        <ul className="flex flex-col gap-2 text-sm p-3">
                                            {thisUser.wallets.map((wallet: any) => (
                                                <li key={wallet.id} className="flex">
                                                    <div className="flex flex-col">
                                                        <span className="text-custom-gray-400">ID: {wallet.id}</span>
                                                        <span className="text-custom-gray-400">Balance: {wallet.balance}</span>
                                                        <span className="text-custom-gray-400 text-xs">Total Received: {wallet.totalReceived}</span>
                                                        <span className="text-custom-gray-400">Currency: {wallet.currency}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <span className="h-0.5 w-full bg-custom-gray-700"></span>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                
            <div className="flex flex-col gap-2 mt-4">

<span className="text-custom-gray-400 text-center text-xs">{wallets && `Showing ${(pageNumber - 1) * 15} to ${(pageNumber - 1) * 15 + wallets.length} of transactions`}</span>

<div className="flex justify-between gap-2">
    <button onClick={() => {
        if (pageNumber == 1) return
        setPageNumber(Number(pageNumber - 1))
    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg  p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center"> <FaArrowLeft /> Previous</button>
    
    <button onClick={() => {
        
        if ( !users || users.length == 0 || users.length > 50) return
        setPageNumber(Number(pageNumber + 1))
    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center">  Next <FaArrowRight /></button>
</div>
</div>
            </div>
        </div>
    )
}