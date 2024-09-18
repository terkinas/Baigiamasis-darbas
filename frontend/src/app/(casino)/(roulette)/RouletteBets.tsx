"use client"

import { useRoulette } from "@/context/games/rouletteContext";
import { useSocket } from "@/hooks/useSocket";
import { useUser } from "@/hooks/useUser";
import { IClientBet } from "@/types/client/bet.interface";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi"
import { GiSpades, GiClover, GiHearts } from "react-icons/gi";
import { GiLevelTwo } from "react-icons/gi";
import { GiLevelThree } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function RouletteBets({ bets, outcome }: { bets: IClientBet[] | null, outcome: string | null }) {

    const { socket } = useSocket()
    const { user } = useUser() ?? {}
    // const { bets } = useRoulette() ?? {}

    const [redBets, setRedBets] = useState<IClientBet[] | null>(null)
    const [blackBets, setBlackBets] = useState<IClientBet[] | null>(null)
    const [greenBets, setGreenBets] = useState<IClientBet[] | null>(null)

    // const [outcome, setOutcome] = useState<string | null>(null)

    useEffect(() => {
        // 

        if (bets) {
            const redBets = bets.filter(bet => bet.betType === 'red')
            const blackBets = bets.filter(bet => bet.betType === 'black')
            const greenBets = bets.filter(bet => bet.betType === 'green')

            const summedRedBetsByUser: IClientBet[] = Object.values(
                redBets.reduce((acc, bet) => {
                  if (bet.betType === 'red') {
                    acc[bet.user.username] = acc[bet.user.username] || {
                      ...bet, // Copy properties directly
                      amount: 0, // Initialize amount for new users
                    };
                    acc[bet.user.username].amount += bet.amount;
                  }
                  return acc;
                }, {} as { [username: string]: IClientBet })
            );

            const summedGreenBetsByUser: IClientBet[] = Object.values(
                greenBets.reduce((acc, bet) => {
                  if (bet.betType === 'green') {
                    acc[bet.user.username] = acc[bet.user.username] || {
                      ...bet, // Copy properties directly
                      amount: 0, // Initialize amount for new users
                    };
                    acc[bet.user.username].amount += bet.amount;
                  }
                  return acc;
                }, {} as { [username: string]: IClientBet })
            );

            const summedBlackBetsByUser: IClientBet[] = Object.values(
                blackBets.reduce((acc, bet) => {
                  if (bet.betType === 'black') {
                    acc[bet.user.username] = acc[bet.user.username] || {
                      ...bet, // Copy properties directly
                      amount: 0, // Initialize amount for new users
                    };
                    acc[bet.user.username].amount += bet.amount;
                  }
                  return acc;
                }, {} as { [username: string]: IClientBet })
            );




            // 
            // 
            // 

            setRedBets(summedRedBetsByUser);
            setGreenBets(summedGreenBetsByUser)
            setBlackBets(summedBlackBetsByUser)
        }
    }, [bets])

    // useEffect(() => {
    //     if(newOutcome == null) {
    //         
    //     }
    //     
    //     setOutcome(newOutcome)
    // }, [newOutcome])

    useEffect(() => {
        // 

        switch (outcome) {
            case 'red':
                setRedBets((prevRedBets) => {
                    // If prevRedBets is null or undefined, return it directly
                    if (!prevRedBets) return prevRedBets;
            
                    // Map over each bet in prevRedBets and update the amount
                    return prevRedBets.map(bet => ({
                        ...bet,
                        amount: bet.amount * 2
                    }));
                });
                break;
            case 'green':
                setGreenBets((prevGreenBets) => {
                    // If prevRedBets is null or undefined, return it directly
                    if (!prevGreenBets) return prevGreenBets;
            
                    // Map over each bet in prevRedBets and update the amount
                    return prevGreenBets.map(bet => ({
                        ...bet,
                        amount: bet.amount * 14
                    }));
                });
                break;

            case 'black':
                setBlackBets((prevBlackBets) => {
                    // If prevRedBets is null or undefined, return it directly
                    if (!prevBlackBets) return prevBlackBets;
            
                    // Map over each bet in prevRedBets and update the amount
                    return prevBlackBets.map(bet => ({
                        ...bet,
                        amount: bet.amount * 2
                    }));
                });
                break;
                default:
                    break;
        }

        // if (outcome == 'red') {
        //     setRedBets((prevRedBets) => {
        //         // If prevRedBets is null or undefined, return it directly
        //         if (!prevRedBets) return prevRedBets;
        
        //         // Map over each bet in prevRedBets and update the amount
        //         return prevRedBets.map(bet => ({
        //             ...bet,
        //             amount: bet.amount * 2
        //         }));
        //     });
        // }

        // if (outcome == 'green') {
        //     setGreenBets((prevGreenBets) => {
        //         // If prevRedBets is null or undefined, return it directly
        //         if (!prevGreenBets) return prevGreenBets;
        
        //         // Map over each bet in prevRedBets and update the amount
        //         return prevGreenBets.map(bet => ({
        //             ...bet,
        //             amount: bet.amount * 2
        //         }));
        //     });
        // }

        // if (outcome == 'black') {
        //     setBlackBets((prevBlackBets) => {
        //         // If prevRedBets is null or undefined, return it directly
        //         if (!prevBlackBets) return prevBlackBets;
        
        //         // Map over each bet in prevRedBets and update the amount
        //         return prevBlackBets.map(bet => ({
        //             ...bet,
        //             amount: bet.amount * 2
        //         }));
        //     });
        // }
    }, [outcome])



    return (
        <div className="flex w-full md:max-w-6xl relative mx-auto">
                <div className="flex flex-col lg:flex-col w-full gap-2 text-sm  md:text-base ">
                
                <h4 className="text-lg md:text-xl text-white flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-custom-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-custom-green-500"></span>
                </span>
                    Live bets
                 </h4>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-2 w-full text-custom-gray-400">
                            
                            <div className="w-full md:w-1/3 border-x-2 border-custom-gray-700 rounded">
                                <div className=" pb-2 flex justify-between px-4 border-b-2 bg-custom-gray-600 py-2 rounded border-custom-gray-600">
                                    <div className="flex gap-2 items-center"><GiHearts className="text-custom-gray-900 text-opacity-70 text-xl p-0.5 bg-custom-red-500 rounded" /><h6>{redBets?.length} Bets total</h6></div>
                                    <p className={`flex gap-2 items-center transition duration-300 text-custom-gray-400 ${outcome == 'red' && 'text-custom-green-500'} `}> <GiTwoCoins className="text-custom-yellow-500 text-xl" /> {((redBets != null ? redBets.reduce((total, bet) => total + bet.amount, 0) : 0) / 100).toFixed(2)}</p>
                                </div>

                                <ul className={`flex flex-col gap-2 my-2 min-h-24`}>
                                            {redBets?.slice().sort((a, b) => {
                                                if (user) {
                                                    if (a.user.username === user.username && b.user.username !== user.username) {
                                                        return -1;
                                                    } else if (a.user.username !== user.username && b.user.username === user.username) {
                                                        return 1;
                                                    }
                                                }
                                                
                                                // Otherwise, sort based on bet amount
                                                return b.amount - a.amount;
                                            })
                                            .slice(0, 10)
                                            .map((bet, index) => (
                                                <li key={index} className={`flex justify-between px-4 text-sm text-custom-gray-400 ${user && user.username == bet.user.username && 'text-white'}`}>

                                                    <div className="flex items-center gap-2"><span className="w-5 h-5 bg-custom-gray-600 block rounded"></span> <p className={`${user && user.username == bet.user.username && 'text-white'}`}>{bet.user.username}</p> </div>
                                                    <p className={`flex gap-2 items-center transition duration-300 ${outcome == 'red' ? 'text-custom-green-500' : outcome !== null && outcome !== 'red' && 'opacity-50'}`}> {(bet.amount / 100).toFixed(2)}</p>
                                                </li>
                                            ))}

                                            
 
                                </ul>
                            </div>
                            
                            <div className="w-full md:w-1/3 border-x-2 border-custom-gray-700 rounded">
                                <div className=" pb-2 flex justify-between px-4 border-b-2 bg-custom-gray-600 py-2 rounded border-custom-gray-600">
                                    <div className="flex gap-2 items-center"><GiClover className="text-custom-gray-900 text-opacity-70 text-xl p-0.5 bg-custom-green-500 rounded" /><h6>{greenBets?.length} Bets total</h6></div>
                                    <p className={`flex gap-2 items-center transition duration-300 text-custom-gray-400 ${outcome == 'green' && 'text-custom-green-500'}`}> <GiTwoCoins className="text-custom-yellow-500 text-xl" /> {((greenBets != null ? greenBets.reduce((total, bet) => total + bet.amount, 0) : 0) / 100).toFixed(2)}</p>
                                </div>
                                <ul className={`flex flex-col gap-2 my-2 min-h-24`}>
                                            {greenBets?.sort((a, b) => {
                                                if (user) {
                                                    if (a.user.username === user.username && b.user.username !== user.username) {
                                                        return -1;
                                                    } else if (a.user.username !== user.username && b.user.username === user.username) {
                                                        return 1;
                                                    }
                                                }
                                                
                                                // Otherwise, sort based on bet amount
                                                return b.amount - a.amount;
                                            })
                                            .slice(0, 10).map((bet, index) => (
                                                <li key={index} className={`flex justify-between px-4 text-sm text-custom-gray-400 ${user && user.username == bet.user.username && 'text-white'}`}>

                                                    <div className="flex items-center gap-2"><span className="w-5 h-5 bg-custom-gray-600 block rounded"></span> <p>{bet.user.username}</p> </div>
                                                    <p className={`flex gap-2 items-center transition duration-300 ${outcome == 'green' ? 'text-custom-green-500' : outcome !== null && outcome !== 'green' && 'opacity-50'}`}> {(bet.amount / 100).toFixed(2)}</p>
                                                </li>
                                            ))}
 
                                </ul>
                            </div>

                            <div className="w-full md:w-1/3 border-x-2 border-custom-gray-700 rounded">
                                <div className=" pb-2 flex justify-between px-4 border-b-2 bg-custom-gray-600 py-2 rounded border-custom-gray-600">
                                    <div className="flex gap-2 items-center"><GiSpades className="text-custom-gray-900 text-opacity-90 text-xl p-0.5 bg-custom-gray-500 rounded" /><h6>{blackBets?.length} Bets total</h6></div>
                                    <p className={`flex gap-2 items-center transition duration-300 text-custom-gray-400 ${outcome == 'black' && 'text-custom-green-500'}`}> <GiTwoCoins className="text-custom-yellow-500 text-xl" /> {((blackBets != null ? blackBets.reduce((total, bet) => total + bet.amount, 0) : 0) / 100).toFixed(2)}</p>
                                </div>
                                <ul className={`flex flex-col gap-2 my-2 min-h-24`}>
                                            {blackBets?.sort((a, b) => {
                                                if (user) {
                                                    if (a.user.username === user.username && b.user.username !== user.username) {
                                                        return -1;
                                                    } else if (a.user.username !== user.username && b.user.username === user.username) {
                                                        return 1;
                                                    }
                                                }
                                                
                                                // Otherwise, sort based on bet amount
                                                return b.amount - a.amount;
                                            })
                                            .slice(0, 10)
                                            .map((bet, index) => (
                                                <li key={index} className={`flex justify-between px-4 text-sm text-custom-gray-400 ${user && user.username == bet.user.username && 'text-white'}`}>

                                                    <div className="flex items-center gap-2"><span className="w-5 h-5 bg-custom-gray-600 block rounded"></span> <p>{bet.user.username}</p> </div>
                                                    <p className={`flex gap-2 items-center transition duration-300 ${outcome == 'black' ? 'text-custom-green-500' : outcome !== null && outcome !== 'black' && 'opacity-50'}`}> {(bet.amount / 100).toFixed(2)}</p>
                                                </li>
                                            ))}
 
                                </ul>
                            </div>

                        </div>
                        
                </div>
            </div>
    )
}