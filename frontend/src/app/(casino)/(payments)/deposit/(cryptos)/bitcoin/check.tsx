"use client"

import { getCryptoDepositStatusBySymbol } from "@/lib/clientRequests";
import { useEffect, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md"

export default function BitcoinDepositCheckButton() {

    const [status, setStatus] = useState<{
        balance: number,
        status: string
    }>({
        balance: 0,
        status: ''
    });
    // const [status, setStatus] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);


    async function checkDepositStatus() {
        setStatus({
            balance: 0,
            status: ''
        }) // reset status
        const response = await getCryptoDepositStatusBySymbol('BTC');
        if (response.status) {
            setStatus(response.status)
        }
        // if (response.data.message) {
        //     setMessage(response.data.message)
        // }
        if(response.message) {
            setMessage(response.message)
        }
        // 
    }

   

    return (
        <>
            <h6 className="text-xs md:text-sm text-custom-gray-400">Please use this button when deposit is made.</h6>
            <button onClick={checkDepositStatus} className="flex flex-row items-center justify-center bg-custom-gray-900 p-3 gap-2 items-center rounded text-custom-gray-100 text-sm md:text-base">
                <FaRegEye className="text-custom-green-500" />
                <span>Confirm deposit</span>
            </button>

            <div className="h-fit">
                {/* <p>{status && status == 'PENDING' && <><MdOutlinePendingActions /> Waiting for confirmations of deposit</>}</p> */}
                {/* <p>{status && status.status != '' && status.balance}</p> */}
                
                {/* {status && <p className="text-sm text-custom-gray-400">!!!!!!!!!!!!{message && message}</p>} */}

                {/* <p className="text-custom-orange-500 flex items-center text-sm gap-2">{status.status && status.status === 'PENDING' && <><MdOutlinePendingActions /> Deposit amount {status.balance} is pending. Waiting for confirmations</>}</p> */}
                {/* <p className="text-custom-green-500 flex items-center text-sm gap-2">{status.status && status.status === 'COMPLETED' && <><MdOutlinePendingActions /> Deposit successfully confirmed! Please refresh to see new balance</>}</p> */}


                {status && 
                    <p className={`flex items-center text-sm gap-2
                    ${status.status == 'PENDING' ? 'text-custom-orange-500' : 
                    status.status == 'COMPLETED' ? 'text-custom-green-500' : 'text-custom-gray-400'
                    }`}>
                        
                        {status.status == 'PENDING' ? <><MdOutlinePendingActions /> Deposit amount {status.balance} is pending. Waiting for confirmations</> : 
                            status.status == 'COMPLETED' ? <><MdOutlinePendingActions /> Deposit successfully confirmed! Please refresh to see new balance</> :
                            message && message
                        }
                    </p>
                }
            </div>
        </>
    )
}