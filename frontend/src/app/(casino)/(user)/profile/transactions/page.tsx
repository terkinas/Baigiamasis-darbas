"use client"

import { useModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { getUserBetTransactions } from "@/lib/clientRequests"
import Error from "next/error";
import { useEffect, useState } from "react"
import { FaShieldAlt, FaRegArrowAltCircleLeft  } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { IoLogInOutline } from "react-icons/io5";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function TransactionPage() {

    const { user } = useUser() ?? { user: null }
    const { toggleModal, openModal } = useModal()


    const [transactions, setTransactions] = useState<any>([])
    const [pageNumber, setPageNumber] = useState<number>(1)

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    useEffect(() => {
        if (user) {
            getTransactions(pageNumber)
        }
    }, [user, pageNumber])


    async function getTransactions(pageNumber: number = 1) {
        if (!user) return

        // const response = await getUserBetTransactions(page)

        // if (!response) return

        // 

        // setTransactions(response.transactions)

        try {
            
            const response = await getUserBetTransactions(pageNumber);
    
            if (!response) return;
    
            
            setTransactions(response.transactions);
        } catch (error: any) {
            setTransactions(null);
        }
    }

    const addLeadingZero = (number: number) => {
        return number < 10 ? '0' + number : number;
      };

    if (!user) return (
        <div className="max-w-xl mx-auto text-white py-6 flex flex-col gap-4">
            <div className="w-full bg-custom-gray-700 p-3">
                    <h4 className=" text-custom-gray-100 flex flex-row gap-1 items-center"><FaShieldAlt /> Authentication </h4>
                    <p className="text-xs py-2 text-custom-gray-400">If you need to see your account, you can log in here</p>
                    <button onClick={() => {
                        toggleModal('authentication')
                        openModal()
                    }} className="w-full bg-custom-gray-900 p-2 rounded text-sm text-custom-gray-300 flex items-center gap-1 justify-center"> <IoLogInOutline /> Sign in</button>
                </div>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto text-white py-6 flex flex-col gap-4">
            <ul className="flex flex-col gap-2">

                {transactions ? transactions.map((transaction: any, index: number) => {

                const inputDate = new Date(transaction.createdAt);

                
                const formattedDate = `${daysOfWeek[inputDate.getUTCDay()]} ${inputDate.getUTCDate()} ${monthsOfYear[inputDate.getUTCMonth()]}, ${inputDate.getUTCFullYear()} ${addLeadingZero(inputDate.getUTCHours())}:${addLeadingZero(inputDate.getUTCMinutes())}`;


                    return (
                        <li key={index} className="flex text-xs justify-between items-center px-4 bg-custom-gray-700 py-2">
                            <div className="flex gap-1 items-center">
                                <span className={`w-4 h-4 ${transaction.betType == 'red' ? 'bg-custom-red-500' : transaction.betType == 'black' ? 'bg-custom-gray-900' : transaction.betType == 'green' && 'bg-custom-green-500'} rounded`}></span>
                                <h5 className="">{transaction.gameId == '1' && 'Roulette bet'}</h5>
                                <span className="text-custom-gray-400">#{transaction.roundId}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className={`flex gap-1 items-center ${transaction.betType == transaction.outcome ? 'text-custom-green-500' : 'text-custom-red-500'}`}> {transaction.betType == transaction.outcome ? '' : '-'} 
                                {transaction.betType == transaction.outcome && 'green' == transaction.outcome ? `${((Number(transaction.amount) / 100) * 14).toFixed(2)}` : 
                                transaction.betType == transaction.outcome ? `${(Number(transaction.amount) / 100) * 2}` : `${(Number(transaction.amount) / 100).toFixed(2)}`}  <GiTwoCoins className="text-custom-yellow-500" /> </span>
                                <span className=" text-custom-gray-400">{formattedDate}</span>
                                {/* <span className="text-xs md:text-sm text-custom-gray-400">Thu 23 Sep, 2021 19:21</span> */}
                            </div>
                        </li>
                    )
                })
                : <p className="text-custom-gray-400 text-sm px-4">No transactions</p>
            
            }



                

            </ul>


            
            <div className="flex flex-col gap-2 mt-4">

                <span className="text-custom-gray-400 text-center text-xs">{transactions && `Showing ${(pageNumber - 1) * 15} to ${(pageNumber - 1) * 15 + transactions.length} of transactions`}</span>
            
                <div className="flex justify-between gap-2">
                    <button onClick={() => {
                        if (pageNumber == 1) return
                        setPageNumber(Number(pageNumber - 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg  p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center"> <FaArrowLeft /> Previous</button>
                    
                    <button onClick={() => {
                        if ( !transactions || transactions.length == 0 || transactions.length < 15) return
                        setPageNumber(Number(pageNumber + 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center">  Next <FaArrowRight /></button>
                </div>
            </div>
        </div>
    )
}