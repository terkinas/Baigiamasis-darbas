"use client"

import { useUser } from "@/hooks/useUser";
import { GiTwoCoins } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr"
import { IoIosStats } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";
import { IoLogInOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { changeUserAvatar, changeUserPassword, getProfileData } from "@/lib/clientRequests";
import Link from "next/link";
import { RiLockPasswordLine } from "react-icons/ri";
import Image from "next/image";
import { avatarUrls } from "@/lib/config";
import { revalidatePath } from "next/cache";

export default function ProfileCard() {

    const { user, signOut, updateUser } = useUser() ?? { user: null };
    const { toggleModal, openModal } = useModal()

    const [stats, setStats] = useState<any>(null)
    const [passwordChanged, setPasswordChanged] = useState<{
        message: string | null
    }>({
        message: null
    })

    const formRef = useRef<HTMLFormElement>(null);

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
                            <span className="w-16 h-16 md:w-24 md:h-24 bg-custom-gray-700 rounded">
                            {user && 
                                                                (
                                                                    <>
                                                                    <Image
                                                                    src={`http://localhost:8000/${avatarUrls[user.avatarId.toString()]}`}
                                                    
                                                                    alt="avatar"
                                                                    width={80}
                                                                    height={80}
                                                                    className="w-full h-full object-contain rounded"
                                                                    />
                                                                    </>
                                                                )}
                            </span>
                            <h4 className="text-xl text-custom-gray-300">{user && user.username}</h4>
                            {user && user.username == 'admin' && (<Link href="/admin/wallets" className="text-custom-green-500">Admin</Link>)}
                        </div>


                        <div className="flex flex-col gap-2 items-start my-4">
                            <span className="block text-xs text-custom-gray-400">Change avatar</span>
                            <form action={async (formData: FormData) => {
                                const avatar = formData.get('avatar') as string | null;
                                console.log(avatar)

                                if (!avatar) {
                                    return alert('Please select an avatar')
                                }

                                const data = await changeUserAvatar(avatar)

                                console.log(data)

                                if (data.message === 'Avatar changed successfully') {
                                    updateUser({
                                        ...user,
                                        avatarId: parseInt(avatar)
                                    })
                                }

                            }}>
                                        <ul className="grid w-full gap-2 grid-cols-7 md:grid-cols-7">

                                            {Object.keys(avatarUrls).map((key, index) => (
                                                <li key={index}>
                                                    <input type="radio" id={`avatar-${key}`} name="avatar" value={`${key}`} className="hidden peer" required />
                                                    <label htmlFor={`avatar-${key}`} className="inline-flex items-center justify-between w-full text-gray-500 bg-black border border-custom-gray-900 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-yellow-500 peer-checked:border-yellow-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                                        {user && 
                                                                (
                                                                    <>
                                                                    <Image
                                                                    src={`http://localhost:8000/${avatarUrls[key]}`}
                                                    
                                                                    alt="avatar"
                                                                    width={40}
                                                                    height={40}
                                                                    className="w-full h-full object-contain rounded"
                                                                    />
                                                                    </>
                                                                )}
                                                    </label>
                                                </li>
                                            ))}
                                    </ul>

                                    <button className="text-custom-gray-200 bg-custom-gray-700 mt-1 text-xs p-2 px-4 w-fit rounded hover:bg-custom-gray-800" type="submit">Save avatar</button>
                            </form>
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


            <div className="w-full flex flex-col gap-4">
                {/* <div className="flex flex-col gap-2">

                </div> */}
                <div className="flex flex-col w-full mx-auto py-3 gap-4 px-4 md:px-8
                                shadow-lg bg-custom-gray-700 rounded">
                    <h4 className="flex gap-2 items-center"><RiLockPasswordLine  className="text-custom-gray-300" />Change password</h4>
                    <div className="h-px bg-custom-gray-500 w-full"></div>

                    <form 
                        ref={formRef}
                        action={async (formData: FormData) => {
                            const newPassword = formData.get('newPassword') as string | null;
                            const confirmPassword = formData.get('confirmPassword') as string | null;
                            const oldPassword = formData.get('oldPassword') as string | null;
                        
                            if (!newPassword || !confirmPassword || !oldPassword) {
                                setPasswordChanged({ message: 'All password fields must be filled out' })
                              return 
                            }
                        
                            if (newPassword !== confirmPassword) {
                                setPasswordChanged({ message: 'Passwords do not match' })
                              return 
                            }
                        
                            let data;

                            try {
                                data = await changeUserPassword(oldPassword, newPassword)
                            } catch (error) {
                                console.log(error)
                                return alert('Failed to change password');
                            }



                            console.log(data)
                            setPasswordChanged(data)

                            if (data.message === 'Password changed successfully') {
                                formRef.current?.reset()
                            }
                          }}
                        className="flex flex-col gap-1 
                        [&>input]:bg-custom-gray-900 [&>input]:outline-none [&>input]:p-2 [&>input]:text-sm">
                        <input type="password" name="oldPassword" placeholder="Old password" />
                        <input type="password" name="newPassword" placeholder="New password" />
                        <input type="password" name="confirmPassword" placeholder="Confirm password" />
                        <p className="text-xs text-custom-gray-400">Please enter your old password, then your new password and confirm it</p>

                        <p className={`text-custom-yellow-500 text-xs`}>{passwordChanged.message}</p>
                        {/* <p className={`text-green-500 text-xs hidden ${passwordChanged.message != null && 'block'}`}>{passwordChanged.message != null && passwordChanged.message }</p> */}
                        <button className="text-custom-gray-200 bg-custom-gray-900 mt-6 text-sm p-2 px-4 w-fit rounded hover:bg-custom-gray-800" type="submit">Change password</button>
                    </form>
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