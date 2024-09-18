"use client"

import { useUser } from "@/hooks/useUser";
import { GiTwoCoins } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr"
import { IoIosStats } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";
import { IoLogInOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getProfileData } from "@/lib/clientRequests";
import Link from "next/link";

export default function ProfileCard() {

    const { user, signOut } = useUser() ?? { user: null };
    const { toggleModal, openModal } = useModal()

    const [stats, setStats] = useState<any>(null)

    useEffect(() => {
        if (user) {
            getProfileStats()
        }
    }, [user])

    async function getProfileStats() {
        const response = await getProfileData()

        if (!response) {
            throw new Error('Failed to fetch profile data');
        }

        setStats(response.stats)
        
    }

    if (!user) return (
        <div className="w-full bg-custom-gray-700 p-3">
                    <h4 className=" text-custom-gray-100 flex flex-row gap-1 items-center"><FaShieldAlt /> Authentication </h4>
                    <p className="text-xs py-2 text-custom-gray-400">If you need to see your account, you can log in here</p>
                    <button onClick={() => {
                        toggleModal('authentication')
                        openModal()
                    }} className="w-full bg-custom-gray-900 p-2 rounded text-sm text-custom-gray-300 flex items-center gap-1 justify-center"> <IoLogInOutline /> Sign in</button>
                </div>
    );

    if (!stats) return

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-3">
                            <span className="w-10 h-10 bg-custom-gray-700 rounded"></span>
                            <h4 className="text-xl text-custom-gray-300">{user && user.username}</h4>
                            {user && user.username == 'admin' && (<Link href="/admin/wallets" className="text-custom-green-500">Admin</Link>)}
                        </div>

                    <p className="text-sm text-custom-gray-400">Your profile information</p>

                    <div className="flex flex-row gap-2 items-center justify-center">
                        <span className="text-sm text-custom-gray-400 flex flex-row items-center gap-1 bg-custom-gray-800 p-2 rounded">Level <p className="text-custom-green-500">0</p></span>
                        

                        <div className="w-full flex flex-col h-full gap-1 items-end">
                            <span className="w-full bg-custom-gray-500 h-1">
                                <span className="bg-custom-green-500 h-1 w-[1%] block"></span>
                            </span>
                            <span className="text-sm text-custom-gray-400">1 / 100</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                {/* <div className="flex flex-col gap-2">

                </div> */}
                <div className="flex flex-col w-full mx-auto py-3 gap-4 px-4 md:px-8
                                shadow-lg bg-custom-gray-700 rounded">
                    <h4 className="flex gap-2 items-center"><IoIosStats className="text-custom-gray-300" />Statistics</h4>
                    <div className="h-px bg-custom-gray-500 w-full"></div>

                    <ul className="w-full flex flex-col gap-2 items-start">
                        <li className="w-full flex flex-row justify-between">
                            <span className="text-sm text-custom-gray-300">Total wagered</span>
                            <span className="text-sm text-custom-gray-300 flex gap-1 items-center">{stats.totalWagered / 100} <GiTwoCoins className="text-custom-yellow-500 text-lg" /></span>
                        </li>

                        <li className="w-full flex flex-row justify-between">
                            <span className="text-sm text-custom-gray-300">Wins</span>
                            <span className="text-sm text-custom-gray-300 flex gap-1 items-center">{stats.totalWon / 100} <GiTwoCoins className="text-custom-yellow-500 text-lg" /></span>
                        </li>

                        <li className="w-full flex flex-row justify-between">
                            <span className="text-sm text-custom-gray-300">Losses</span>
                            <span className="text-sm text-custom-gray-300 flex gap-1 items-center">{stats.totalLost / 100} <GiTwoCoins className="text-custom-yellow-500 text-lg" /></span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* logout button */}
            {user && (
                <div className="w-full bg-custom-gray-700 p-3">
                    <h4 className=" text-custom-gray-100 flex flex-row gap-1 items-center"><FaShieldAlt /> Authentication </h4>
                    <p className="text-xs py-2 text-custom-gray-400">If you need to change account, you can log off here</p>
                    <button onClick={signOut} className="w-full bg-custom-gray-900 p-2 rounded text-sm text-custom-gray-300 flex items-center gap-1 justify-center"> <IoLogOutOutline /> Logout</button>
                </div>
            )}

        </>
    )

    // return (
    //     <>Hello world</>
    // )


}