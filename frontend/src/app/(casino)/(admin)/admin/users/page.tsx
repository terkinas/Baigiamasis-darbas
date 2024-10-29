"use client"

import { useUser } from "@/hooks/useUser";
import { disableUserMessages, getUsersForAdmin, getWalletsForAdmin } from "@/lib/clientRequests";
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TbMessagesOff } from "react-icons/tb";

export default function AdminUsersPage() {

    const { user } = useUser() ?? { user: null }

    const [users, setUsers] = useState<any>([])
    const [pageNumber, setPageNumber] = useState<number>(1)


    
    useEffect(() => {
        
        if (user) {
            getWallets(pageNumber)
        }
    }, [user, pageNumber])


    async function getWallets(pageNumber: number = 1) {
        if (!user) return

        try {
            
            const response = await getUsersForAdmin(pageNumber);

            
    
            if (!response) return;
    
            
            setUsers(response);
        } catch (error: any) {
            setUsers(null);
        }
    }



    return (



            <div className="w-full lg:max-w-[calc(100vw-16rem)] max-w-xl px-4 py-10 md:p-10 text-custom-gray-100">

            {/* withdraw table */}
            <div className="w-full flex flex-col gap-3 max-w-xl mx-auto">



            <div className="w-full flex flex-col gap-6 max-w-xl mx-auto">
                <h4 className="text-xl md:text-3xl">Manage Users</h4>
                <hr  />
                <p className="text-custom-gray-400">Welcome to the users management page. Here you can view and manage users.</p>


                <div>
                    <ul className="flex flex-col">

                        {users.map((thisUser: any) => (
                                <li key={thisUser.id} className="flex flex-col">
                                    
                                        <div className="flex flex-col text-sm py-4">
                                            <span className="text-custom-gray-400">User ID: {thisUser.id}</span>
                                            <span className="text-custom-gray-400">Username: <span className="text-custom-gray-200">{thisUser.username}</span></span>
                                            <span className="text-custom-gray-400">Chat status: <p className="text-custom-green-500 inline">{thisUser.isChatBanned ? 'Banned' : 'Available'}</p></span>
                                            
                                        </div>

                                        <form className="py-2" onSubmit={async (e) => {
                                            // handle form submit
                                            e.preventDefault()

                                            const data = await disableUserMessages(thisUser.id)

                                            console.log(data)

                                            {thisUser.isChatBanned ? alert('User messages enabled') : alert(data.message)}
                                        }}>
                                            <input type="hidden" name="userId" value={thisUser.id} />
                                            <button className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center"><TbMessagesOff /> {thisUser.isChatBanned ? 'Enable messages' : 'Disable messages'}</button>
                                        </form>
                                        

                                        <span className="h-0.5 w-full bg-custom-gray-700"></span>
                                    
                                </li>
                            )
                        )}
                    </ul>
                </div>

                
            {/* <div className="flex flex-col gap-2 mt-4"></div> */}

            <span className="text-custom-gray-400 text-center text-xs">{users && `Showing ${(pageNumber - 1) * 150} to ${(pageNumber - 1) * 150 + users.length} of users`}</span>

                <div className="flex justify-between gap-2">
                    <button onClick={() => {
                        if (pageNumber == 1) return
                        setPageNumber(Number(pageNumber - 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg  p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center"> <FaArrowLeft /> Previous</button>
                    
                    <button onClick={() => {
                        
                        if ( !users || users.length == 0 || users.length > 150) return
                        setPageNumber(Number(pageNumber + 1))
                    }} className="bg-custom-gray-700 border border-custom-gray-600 shadow-lg p-2 rounded text-sm text-custom-gray-100 flex items-center gap-1 justify-center">  Next <FaArrowRight /></button>
                </div>
                </div>
            </div>
            </div>


                
    )
}