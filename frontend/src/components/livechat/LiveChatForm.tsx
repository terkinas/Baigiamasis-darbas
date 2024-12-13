"use client"

import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { IoSend} from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from "axios";


export default function LiveChatForm() {

    const { user } = useUser() ?? { user: null };
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && event.shiftKey) {
          event.preventDefault(); // Prevent creating new lines with Shift + Enter
        }
    };

    const sendMessage = async () => {
        // if (user && message && message !== "") {
        //     
        //     setMessage("");
        // }

        if (!user) {
            setError('Prisijunkite, norėdami rašyti žinutes')
            return
        }

        if (message === "") {
            setError('Įrašykite žinutę')
            return
        }

        if (message.length > 128) {
            setError('Žinutė per ilga')
            return
        }

        try {
            setError(null);
            const response = await axios.post('/livechat/messages', { message }, { withCredentials: true })
        
            if (response) {
                setMessage("");
            }
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError("An unknown error occurred");
                }
            } else {
                setError("An unknown error occurred");
            }
        }
    }

    return (
        <div className={`flex flex-col gap-2 mt-0 ${error && 'mt-0'}`}>
            {error && <p className="text-custom-red-500 text-xs mb-2">{error}</p>}
            <div className="flex justify-between rounded w-full p-1 mb-2 bg-custom-gray-700 text-sm text-custom-gray-100">

                <textarea value={message} maxLength={128} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown}
                placeholder='Įrašykite žinutę...' 
                className="resize-none h-16 text-area-scrollbar w-full bg-custom-gray-700 text-custom-gray-100 p-2 rounded focus:outline-none" />

                <div className="h-full flex flex-col items-center justify-around">
                    <button onClick={sendMessage} className={`text-custom-gray-10 bg-custom-gray-500 p-2 rounded  focus:outline-none ${!user ? 'cursor-not-allowed' : 'hover:bg-custom-gray-600'}`}> <IoSend /> </button>
                    <button onClick={sendMessage} className={`text-custom-gray-10 bg-custom-gray-500 p-2 rounded  focus:outline-none ${!user ? 'cursor-not-allowed' : 'hover:bg-custom-gray-600'}`}> <HiOutlineDotsVertical /> </button>
                </div>

            </div>
        </div>
    )
}