"use client"

import { AiOutlineLoading } from "react-icons/ai";
import { Suspense, useEffect, useRef, useState } from "react"
import RouletteBetting from "./RouletteBetting"
import useWindow from "@/hooks/useWindow"
import dynamic from "next/dynamic"
import RouletteBets from "./RouletteBets";
import { useSocket } from "@/hooks/useSocket";
import { useRoulette } from "@/context/games/rouletteContext";
import { rouletteConfig } from "./config";
import { IPersonalBets } from "./personalBets.interface";
import { useUser } from "@/hooks/useUser";
import { IClientUser } from "@/types/client/user.interface";
import { IClientBet } from "@/types/client/bet.interface";
import RouletteMiniHistory from "./RouletteMiniHistory";
// import NewRouletteWheel from "./NewRouletteWheel"
import RouletteWheel from "./RouletteWheel"

// const RouletteWheel = dynamic(() => import('./RouletteWheel'), { 
//     // loading: () => <p className="flex flex-1 h-full items-center justify-center text-white overflow-y-h animate-spin"><AiOutlineLoading /></p>,
//  })

 const initialPersonalBets = {
    red: 0.00,
    black: 0.00,
    green: 0.00
 }

export default function RouletteGame() {

    const { socket } = useSocket()
    // const { user: initialUser, increaseUserBalance } = useUser() ?? {}
    const { user, increaseUserBalance } = useUser() ?? { user: null, increaseUserBalance: null};

    const { roundId: initialRoundId, isOpen: initialIsOpen, bets: initialBets, updatedAt: initialUpdatedAt, history: initialHistory, outcome: initialOutome } = useRoulette() ?? {}

    const [isOpen, setIsOpen] = useState(initialIsOpen)
    const [roundId, setRoundId] = useState(initialRoundId)
    const [outcome, setOutcome] = useState<string | null>(null)
    const [outcomeNumber, setOutcomeNumber] = useState<number | null>(null)
    const [bets, setBets] = useState<IClientBet[]>(initialBets)

    const [updatedAt, setUpdatedAt] = useState<Date | null>(initialUpdatedAt)

    const [history, setHistory] = useState<string[] | null>(initialHistory)

    const [timeDifferece, setTimeDifference] = useState<number | null>(null)

    const [previousRoundId, setPreviousRoundId] = useState<number | null>(null)
    const [waitTime, setWaitTime] = useState<number | null>(null)
    // const [user, setUser] = useState<IClientUser | null>()

    const progressBarRef = useRef<HTMLDivElement>(null);

    const [personalBets, setPersonalBets] = useState<IPersonalBets>(initialPersonalBets)

    function initSocketEvents() {
        socket?.on('roulette:round', (round: any) => {


            
            // 
            
            
            
            if (round.outcome == null) {
                setOutcome(round.outcome);
            }

            

            if (updatedAt !== null) {
                const updatedAtDate = new Date(updatedAt);
                if (!isNaN(updatedAtDate.getTime())) {
                    const millisecondsDifference = new Date().getTime() - updatedAtDate.getTime();
                    const secondsDifference = millisecondsDifference / 1000;
                    
                    setTimeDifference(secondsDifference);
                }
            }

            setIsOpen(round.isOpen);
            setRoundId(round.id);
            setUpdatedAt(new Date(round.updatedAt));


            if (round.outcomeNumber !== null) {
                setOutcomeNumber(round.outcomeNumber);
                setTimeout(() => {
                    setPersonalBets(prevPersonalBets => {
                        if (round.outcome && Object.keys(prevPersonalBets).includes(round.outcome)) {
                            let winning = 0;
                            const outcomeKey: keyof IPersonalBets = round.outcome as keyof IPersonalBets; // Cast round.outcome to keyof IPersonalBets
                            if (round.outcome === 'green') {
                                winning = prevPersonalBets[outcomeKey] * 14;
                            } else {
                                winning = prevPersonalBets[outcomeKey] * 2;
                            }

                            winning = Math.floor(winning * 100)
                            if (user) {
                                increaseUserBalance(user, winning); // Increase user balance by winning amount
                            }
                        }
                        return prevPersonalBets; // Return the previous state as no update is needed
                    });

                    setOutcome(round.outcome);
                    
                    if(history && round.outcome && round.outcome !== null) {
                        // setHistory([round.outcome, ...history])

                        setHistory(prevHistory => {
                            const newHistory = [round.outcome, ...(prevHistory || []).slice(0, 9)];
                            return newHistory;
                        });
                    }
                    
                }, rouletteConfig.spinTime);
            }


            if (round.isOpen) {
                setPersonalBets(initialPersonalBets)
            }
        })

        socket?.on('roulette:bet', (bet: IClientBet) => {
            // 
            setBets(prev => [...prev, bet])
        })
    }

    useEffect(() => {
        initSocketEvents()

        return () => {
            socket?.off('roulette:round');
            socket?.off('roulette:bet');
        }
    }, [socket, user, roundId])  

    useEffect(() => {
        if (roundId !== previousRoundId && roundId !== null) {
            setPreviousRoundId(roundId);

            if (updatedAt !== null) {
                const updateAtInSeconds = new Date(updatedAt).getTime() / 1000;
                if (!isNaN(updateAtInSeconds)) {
                    const currentTimeInSeconds = new Date().getTime() / 1000;
                    const timeDifferenceInSeconds =  currentTimeInSeconds - updateAtInSeconds;
                    let waitTimeInSeconds = (rouletteConfig.waitForSpinTime / 1000) - timeDifferenceInSeconds;
                    
                    if (outcome !== null) {

                        waitTimeInSeconds = ((rouletteConfig.spinTime + rouletteConfig.afterSpinCooldown) / 1000) - timeDifferenceInSeconds
                        
                    }
                    
                    
                    setWaitTime(Math.floor(waitTimeInSeconds));
                    
                }
            }


           
        }
    }, [updatedAt])

    useEffect(() => {
        setIsOpen(initialIsOpen); // Update isOpen state when initialIsOpen changes
    }, [initialIsOpen])

    useEffect(() => {
        setRoundId(initialRoundId); // Update roundId state when initialRoundId changes
    }, [initialRoundId])

    useEffect(() => {
        setBets(initialBets); // Update bets state when initialBets changes
    }, [initialBets])

    useEffect(() => {
        setUpdatedAt(initialUpdatedAt); // Update updatedAt state when initialUpdatedAt changes
    }, [initialUpdatedAt])

    useEffect(() => {
        if (roundId != initialRoundId) {
            setBets([])
        }
    }, [roundId])

    useEffect(() => {
        setHistory(initialHistory);
        // 
    }, [initialHistory])

    useEffect(() => {
        // setOutcome(initialOutome);
        if (history && initialOutome && initialOutome !== null) {
            setHistory(prevHistory => {
                const newHistory = [initialOutome, ...(prevHistory || []).slice(0, 9)];
                return newHistory;
            });
        }
    }, [initialOutome])
    
    return (
        <>
            {/* roulette history */}
            <RouletteMiniHistory history={history} />

            {/* roullete linear separation line */}
            <div className="flex">
                <div className="w-full h-1 bg-custom-gray-700 rounded">
                    {/* {
                        waitTime && <div id="rouletteProgressBar" className={`bg-custom-red-500 h-1 w-0 rounded-full animate-[lineShrink_30s_ease-in-out_forwards]`}></div>
                    } */}
                    {
                        waitTime && isOpen && (<div key={roundId} id="rouletteProgressBar" className={`bg-custom-red-500 h-1 w-0 rounded-full animate-[lineShrink_29s_ease-in-out_forwards]`}></div>)
                    }
                </div>
            </div>

            <RouletteWheel 
            roundId={roundId} 
            outcomeNumber={outcomeNumber} 
            setOutcomeNumber={setOutcomeNumber} 
            updatedAt={updatedAt} />

            <RouletteBetting 
            isOpen={isOpen} 
            roundId={roundId} 
            personalBets={personalBets} 
            setPersonalBets={setPersonalBets} />

            <RouletteBets 
            bets={bets}
            outcome={outcome} />
        </>
    )
}