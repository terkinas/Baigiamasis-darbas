"use client"

import { useRoulette } from "@/context/games/rouletteContext";
import useAxios from "@/hooks/useAxios";
import { useModal } from "@/hooks/useModal";
import { useSocket } from "@/hooks/useSocket";
import { useUser } from "@/hooks/useUser";
import { IClientUser } from "@/types/client/user.interface";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";

import { GiSpades, GiClover, GiHearts } from "react-icons/gi";
import { IPersonalBets } from "./personalBets.interface";

const colors = ['red', 'black', 'green']

export default function RouletteBetting({ isOpen, roundId, personalBets, setPersonalBets }: { isOpen: boolean, roundId: number | null, personalBets: IPersonalBets,  setPersonalBets: React.Dispatch<React.SetStateAction<IPersonalBets>>}) {

    // const { socket } = useSocket()
    const { user, updateUser } = useUser()!
    const { toggleModal, openModal } = useModal();
    const { axiosPost } = useAxios();
    // const { roundId, isOpen: initialRoundOpenStatus } = useRoulette() ?? {}
    // const { roundId } = useRoulette() ?? {}

    // const [isOpen, setIsOpen] = useState<boolean>(initialRoundOpenStatus)
    // const [betAmount, setBetAmount] = useState<number>(0.01);
    const [betAmount, setBetAmount] = useState<any>('0.01');
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     setIsOpen(initialRoundOpenStatus); // Update isOpen state when initialRoundOpenStatus changes
    // }, [initialRoundOpenStatus]);


    // useEffect(() => {

    //     // {user.balance.amount && (Number(user.balance.amount) / 100).toFixed(2)}
    //     initSocketEvents()
    // }, [socket])

    // function initSocketEvents() {
    //     socket?.on('roulette:round', (round: any) => {
    //         
    //         setIsOpen(round.isOpen)
    //     })

    //     
    // }

    async function handleBet(betType: string) {
        if (isLoading) return

        setIsLoading(true)

        if (!isOpen) {
            console.error('Round is closed')
            setIsLoading(false)
            return
        }

        if (!user) {
            toggleModal('authentication')
            openModal()
            setIsLoading(false)
            return
        }

        if (!colors.includes(betType)) {
            console.error('Invalid bet type')
            setIsLoading(false)
            return
        }

        if (!roundId) {
            console.error('Invalid round ID')
            setIsLoading(false)
            return
        }

        if (roundId === undefined || roundId == null) {
            console.error('Invalid round ID')
            setIsLoading(false)
            return
        }

        if (!betAmount || betAmount <= 0) {
            console.error('Invalid bet amount')
            setIsLoading(false)
            return
        }

        if (Math.floor(betAmount * 100) > user.balance.amount) {
            console.error('Insufficient balance')
            setIsLoading(false)
            return
        }

        let betObject = {
            roundId: roundId,
            betType,
            amount: Math.floor(betAmount * 100)
        }

        // 


        const response = await axiosPost('/roulette/bet', betObject, {})

        if (response) {
            updateUser(response.user as IClientUser)

            setPersonalBets((prev) => {
                return {
                    ...prev,
                    [betType]: prev[betType as keyof IPersonalBets] + betAmount
                }
            })
        }

        if (response?.error) {
            console.error('Error placing bet', response.error)
        }

        setIsLoading(false)
    }

    return (
        <div className="flex flex-col gap-6">

        {/* bet amount table */}
        <div className="flex w-full md:w-[600px] relative mx-auto">
            <div className="h-full w-full bg-custom-gray-700 p-3 flex flex-col md:flex-row gap-3 rounded">
                <div className="flex items-center gap-2 w-full rounded bg-custom-gray-600 p-2 px-4">
                    <GiTwoCoins className="text-custom-yellow-500 text-xl" />
                    <input type="number" step="0.01" value={`${betAmount && betAmount}`} 
                        
                    //     onChange={(e) => {
                    //     const inputValue = e.target.value.replace(/\+|-/ig, '');
                    //     // const inputValue = e.target.value;
                    //     // const inputValue = e.target.value.replace(/[^0-9.]/g, '');
                    //     const numericValue = parseFloat(inputValue);


                    //     // Check if numericValue is a valid number
                    //     if (!isNaN(numericValue)) {
                    //       // Update the state with the parsed decimal value
                    //       setBetAmount(numericValue);
                    //     } else {
                    //       // Handle non-numeric input, set amount to null or an appropriate default value
                    //       setBetAmount(0);
                    //     }
                    //   }}

                    onKeyDown={(e) => {
                        if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace') {
                          e.preventDefault();
                        }
                      }}

                    onChange={(e) => {
                        // const inputValue = e.target.value.replace(/\+|-/ig, '');
                        // const inputValue = e.target.value;
                        const inputValue = e.target.value.replace(/[^0-9.]/g, '');
                        // const numericValue = parseFloat(inputValue);

                        setBetAmount(inputValue);

                      }}

                    onBlur={() => betAmount && setBetAmount(Number(Number(betAmount).toFixed(2)))} 
                    className="w-full outline-none bg-custom-gray-600 focus:outline-0 caret-custom-gray-100 caret-2 text-custom-gray-100" placeholder={`0.00`} />
                </div>
                <div className="flex w-full gap-2 text-custom-gray-400 [&>button]:w-full [&>button]:p-2 [&>button]:bg-custom-gray-600 [&>button]:rounded mx-auto">
                    <button className="hover:bg-custom-gray-800" onClick={() => {
                        if(betAmount && Number(betAmount) > 0) {
                            setBetAmount((betAmount / 2).toFixed(2) as any)
                        }
                    }}>1/2</button>
                    <button className="hover:bg-custom-gray-800" onClick={() => {
                        if(betAmount && Number(betAmount) > 0) {
                            setBetAmount((betAmount * 2).toFixed(2) as any)
                        }
                    }}>x2</button>
                    <button className="hover:bg-custom-gray-800" onClick={() => {
                            setBetAmount(Number(0.01))
                    }}>Min</button>
                    <button className="hover:bg-custom-gray-800" onClick={() => {
                        if(betAmount && Number(betAmount) > 0) {
                            setBetAmount(user?.balance.amount as number / 100)
                        }
                    }}>Max</button>
                </div>
            </div>
        </div>  

            {/* bet side table */}
            <div className={`flex w-full h-36 md:h-14 relative mx-auto transition duration-300 ${!isOpen && 'opacity-25 cursor-not-allowed'}`}>
                <div className="w-full md:max-w-6xl flex flex-col lg:flex-row mx-auto gap-2 text-sm  md:text-base">


                                <div className={`flex gap-2 h-full w-full [&>div]:shadow-[inset_0_0px_24px_rgba(0,0,0,0.4)]`}>
                                    

                                    <div onClick={() => handleBet('red')} className="w-full flex-col md:flex-row py-4 h-fit md:h-full bg-custom-gray-600 rounded transition duration-150
                                    text-custom-gray-100 flex  items-center justify-between cursor-pointer md:gap-1 bg-gradient-to-tr from-custom-red-500 to-custom-red-400 px-1 md:px-4
                                    hover:opacity-85"> 
                                            
                                            <p className="flex flex-col md:flex-row items-center justify-center gap-2 "> <GiHearts className=" text-5xl text-custom-gray-900 opacity-50" /> <span className="whitespace-nowrap">Atlikti statymą</span></p> 
                                            <p className="text-xs whitespace-nowrap md:text-sm ">Win 2x</p>
                                    </div>

                                    <div onClick={() => handleBet('green')} className="w-full flex-col md:flex-row py-4 h-fit md:h-full bg-custom-gray-600 rounded transition duration-150
                                    text-custom-gray-100 flex  items-center justify-between cursor-pointer md:gap-1 bg-gradient-to-tr from-custom-green-500 to-custom-green-500 hover:to-custom-green-400 px-1 md:px-4
                                    hover:opacity-85"> 
                                            
                                            <p className="flex flex-col md:flex-row items-center justify-center gap-2 "> <GiClover className=" text-5xl text-custom-gray-900 opacity-50" /> <span  className="whitespace-nowrap">Atlikti statymą</span></p> 
                                            <p className="text-xs whitespace-nowrap md:text-sm opacity-80">Win 14x</p>
                                    </div>
                                    

                                    <div onClick={() => handleBet('black')} className="w-full flex-col md:flex-row py-4 h-fit md:h-full bg-custom-gray-600 rounded transition duration-150
                                    text-custom-gray-100 flex  items-center justify-between cursor-pointer md:gap-1 bg-gradient-to-tr from-custom-gray-600 to-custom-gray-600 hover:to-custom-gray-500 px-1 md:px-4"> 
                                            
                                            <p className="flex flex-col md:flex-row items-center justify-center gap-2"> <GiSpades className=" text-5xl text-custom-gray-900 opacity-50" /> <span  className="whitespace-nowrap">Atlikti statymą</span></p> 
                                            <p className="text-custom-gray-400 text-xs whitespace-nowrap md:text-sm">Win 2x</p>
                                    </div>
                                    
                                </div>
                                {/* <div className="flex gap-2 h-full w-full ">
                                </div> */}
                </div>
            </div>
        </div>
    )
}