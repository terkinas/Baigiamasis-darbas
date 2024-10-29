"use client"

import { useUser } from "@/hooks/useUser"
import { deleteMessage, disableUserMessages, getAllMessages, getAllTransactions, getUsersForAdmin } from "@/lib/clientRequests"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa6"
import { TbMessagesOff } from "react-icons/tb"

export default function AdminUsersPage() {

    const { user } = useUser() ?? { user: null }

    const [transactions, setTransactions] = useState<any>([])
    const [pageNumber, setPageNumber] = useState<number>(1)


    
    useEffect(() => {
        
        if (user) {
            getWallets(pageNumber)
        }
    }, [user, pageNumber])


    async function getWallets(pageNumber: number = 1) {
        if (!user) return

        try {
            
            const response = await getAllTransactions();

            console.log(response)
    
            if (!response) return;
    
            
            setTransactions(response.transactions);
        } catch (error: any) {
            setTransactions(null);
        }
    }



    return (



            <div className="w-full lg:max-w-[calc(100vw-16rem)] max-w-xl px-4 py-10 md:p-10 text-custom-gray-100">

            {/* withdraw table */}
            <div className="w-full flex flex-col gap-3 max-w-xl mx-auto">



            <div className="w-full flex flex-col gap-6 max-w-xl mx-auto">
                <h4 className="text-xl md:text-3xl">Manage Transactions</h4>
                <hr  />
                <p className="text-custom-gray-400">Welcome to the transactions management page. Here you can view and manage transactions.</p>


                <div>
                    <ul className="flex flex-col">

                        {transactions.map((transaction: any) => (
                                <li key={transaction.id} className="flex flex-col">
                                    
                                        <div className="flex flex-col text-sm py-4">
                                            <span className="text-custom-gray-400">Username: <span className="text-custom-gray-400">{transaction.user.username}</span></span>
                                            <p className="text-custom-gray-400">Amount: <span className="text-custom-gray-200">{transaction.amount / 100}</span></p>
                                            <p className="text-custom-gray-400">Bet choice: <span className="text-custom-gray-200">{transaction.betType}</span></p>
                                            <p className="text-custom-gray-400">Bet result: <span className="text-custom-gray-200">{transaction.outcome}</span></p>
                                            <p className="text-custom-gray-400">Bet date: <span className="text-custom-gray-200">{new Date(transaction.createdAt).toLocaleDateString()}</span></p>

                                            <p className="py-2">Status: <span className={transaction.betType == transaction.outcome ? 'text-custom-green-500' : 'text-custom-red-500'}>
                                                {transaction.betType == transaction.outcome ? 'WON' : 'LOST'}
                                            </span>
                                            </p>
                                        </div>

                                        

                                        <span className="h-0.5 w-full bg-custom-gray-700"></span>
                                    
                                </li>
                            )
                        )}
                    </ul>
                </div>

                
            {/* <div className="flex flex-col gap-2 mt-4"></div> */}

                            
                <span className="text-custom-gray-400 text-center text-xs">{transactions && `Showing ${(pageNumber - 1) * 150} to ${(pageNumber - 1) * 150 + transactions.length} of transactions`}</span>

                <div className="flex justify-between gap-2">
                    <button onClick={() => {
                        if (pageNumber == 1) return
                        setPageNumber(Number(pageNumber - 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg  p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center"> <FaArrowLeft /> Previous</button>
                    
                    <button onClick={() => {
                        
                        if ( !transactions || transactions.length == 0 || transactions.length > 150) return
                        setPageNumber(Number(pageNumber + 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center">  Next <FaArrowRight /></button>
                </div>
                </div>
            </div>
            </div>



                
    )
}