"use client"

import { useUser } from "@/hooks/useUser"
import { deleteMessage, disableUserMessages, getAllMessages, getUsersForAdmin } from "@/lib/clientRequests"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa6"
import { TbMessagesOff } from "react-icons/tb"

export default function AdminUsersPage() {

    const { user } = useUser() ?? { user: null }

    const [messages, setMessages] = useState<any>([])
    const [pageNumber, setPageNumber] = useState<number>(1)


    
    useEffect(() => {
        
        if (user) {
            getWallets(pageNumber)
        }
    }, [user, pageNumber])


    async function getWallets(pageNumber: number = 1) {
        if (!user) return

        try {
            
            const response = await getAllMessages();

            
    
            if (!response) return;
    
            
            setMessages(response.messages);
        } catch (error: any) {
            setMessages(null);
        }
    }



    return (



            <div className="w-full lg:max-w-[calc(100vw-16rem)] max-w-xl px-4 py-10 md:p-10 text-custom-gray-100">

            {/* withdraw table */}
            <div className="w-full flex flex-col gap-3 max-w-xl mx-auto">



            <div className="w-full flex flex-col gap-6 max-w-xl mx-auto">
                <h4 className="text-xl md:text-3xl">Manage Messages</h4>
                <hr  />
                <p className="text-custom-gray-400">Welcome to the messages management page. Here you can view and manage messages.</p>


                <div>
                    <ul className="flex flex-col">

                        {messages.map((message: any) => (
                                <li key={message.id} className="flex flex-col">
                                    
                                        <div className="flex flex-col text-sm py-4">
                                            <span className="text-custom-gray-400">Username: <span className="text-custom-gray-400">{message.user.username}</span></span>
                                            <p className="text-custom-gray-400">Message: <span className="text-custom-gray-200">{message.content}</span></p>
                                        </div>

                                        <form className="py-2" onSubmit={async (e) => {
                                            // handle form submit
                                            e.preventDefault()

                                            console.log('message id', message)

                                            const data = await deleteMessage(message.id)

                                            console.log(data)

                                            if (data instanceof Error) {
                                                console.log(data.message)
                                                return
                                            }

                                            alert('Message deleted successfully')

                                        
                                        }}>
                                            <input type="hidden" name="userId" value={message.id} />
                                            <button className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center hover:bg-custom-gray-900"><FaTrash  /> {'Delete message'}</button>
                                        </form>
                                        

                                        <span className="h-0.5 w-full bg-custom-gray-700"></span>
                                    
                                </li>
                            )
                        )}
                    </ul>
                </div>

                
            {/* <div className="flex flex-col gap-2 mt-4"></div> */}

            <span className="text-custom-gray-400 text-center text-xs">{messages && `Showing ${(pageNumber - 1) * 1500} to ${(pageNumber - 1) * 1500 + messages.length} of messages`}</span>

                <div className="flex justify-between gap-2">
                    <button onClick={() => {
                        if (pageNumber == 1) return
                        setPageNumber(Number(pageNumber - 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg  p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center"> <FaArrowLeft /> Previous</button>
                    
                    <button onClick={() => {
                        
                        if ( !messages || messages.length == 0 || messages.length > 1500) return
                        setPageNumber(Number(pageNumber + 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center">  Next <FaArrowRight /></button>
                </div>
                </div>
            </div>
            </div>
     


                
    )
}