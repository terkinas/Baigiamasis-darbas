"use client"

import { useEffect, useRef, useState } from "react"
import RouletteCard from "./RouletteCard"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useSocket } from "@/hooks/useSocket";
import { IClientRouletteRound } from "@/types/client/round.interface";
import { rouletteConfig } from "./config";

const roulette = {
    // numbers count = 15
    numbers: [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4],
    rows: 8,
}


export default function RouletteWheel({ roundId, outcomeNumber, setOutcomeNumber, updatedAt }: 
    { roundId: number | null, outcomeNumber: number | null, setOutcomeNumber: React.Dispatch<React.SetStateAction<number | null>>, updatedAt: Date | null }) {

    const { socket } = useSocket()

    // const rowWidth = -(roulette.numbers.length * squareWidth)
    // let squareWidth = typeof window !== 'undefined' && window.innerWidth > 768 ? rouletteConfig.cardWidth : rouletteConfig.cardWidthMobile;
    // let squareWidth = 128

    const [squareWidth, setSquareWidth] = useState(typeof window !== 'undefined' && window.innerWidth > 768 ? rouletteConfig.cardWidth : rouletteConfig.cardWidthMobile)
    
    const [resetX, setResetX] = useState(-(squareWidth*roulette.numbers.length))

    const [cardIndex, setCardIndex] = useState(0)

    const [previousRoundId, setPreviousRoundId] = useState<number | null>(null)

    const [isLoaded, setIsLoaded] = useState(false);

    const wheel = useRef<HTMLDivElement>(null)



    let lastTranslateX = 0

    useEffect(() => {
        // 

        if (roundId !== previousRoundId && outcomeNumber !== null && outcomeNumber !== undefined) {
            // 
            spin(Number(outcomeNumber))
            setPreviousRoundId(roundId)
            setOutcomeNumber(null)
        }
    }, [updatedAt])

    useEffect(() => {
        const tracker = setInterval(trackCard, 1000 / 30)

        return () => {
            clearInterval(tracker)
        }
    }, [cardIndex])

    useEffect(() => {
        if (!wheel.current) return
        wheel.current.style.transform = `translateX(-${squareWidth*roulette.numbers.length}px)`

        const handleResize = () => {
            setSquareWidth(window.innerWidth > 768 ? rouletteConfig.cardWidth : rouletteConfig.cardWidthMobile)
            // squareWidth = window.innerWidth > 768 ? rouletteConfig.cardWidth : rouletteConfig.cardWidthMobile
        }
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoaded])

    useEffect(() => {
        if (isLoaded) return
        setIsLoaded(true)
        
    }, [])

    // useEffect(() => {

    //     function initSocketEvents() {
    //         socket?.on('roulette:round', (round: IClientRouletteRound) => {
    //             
    //             if (!!round.outcomeNumber && round.outcomeNumber !== null) {
    //                 spin(Number(round.outcomeNumber))
    //             }
    //         })
    //     }

    //     initSocketEvents()

    //     return () => {
    //         socket?.off('roulette:round')
    //     }
    // }, [resetX])
    

    function spin(outcome: number) {
        const wheelElement = wheel.current
        if (!wheelElement) return

        wheelElement.style.transition = 'transform 0s'
        wheelElement.style.transform = `translateX(${resetX}px)`

    
        const position = roulette.numbers.indexOf(outcome)
        const landingX = ((roulette.rows - 1) * roulette.numbers.length * squareWidth) + (position * squareWidth) + (squareWidth)
        // const finalLandingX = landingX - (squareWidth / 2)
        const finalLandingX = landingX - (Math.floor((Math.random() * (squareWidth - 2) + 1)))

        // 
        // 

        // 
        // 

        setResetX(-(finalLandingX - ((roulette.rows - 2) * roulette.numbers.length * squareWidth)))

        const wheelElementStyle = window.getComputedStyle(wheelElement)
        const wheelElementTransform = wheelElementStyle.getPropertyValue('transform')
        let translateX = 0

        if (wheelElementTransform && wheelElementTransform !== 'none') {
            const matrix = wheelElementTransform.match(/^matrix\((.+)\)$/)
            if (matrix) {
                const matrixValues = matrix[1].split(',')
                if (matrixValues.length >= 6) {
                    translateX = parseFloat(matrixValues[4])

                    if (translateX == resetX) {
                        wheelElement.style.transition = `transform ${rouletteConfig.spinTime/1000}s cubic-bezier(0.275, 0.2, 0.165, 1)`
                        wheelElement.style.transform = `translateX(${-finalLandingX}px)` 
                    }
                }
            }
        }
    }

    const trackCard = () => {
        const wheelElement = wheel.current
        if (!wheelElement) return

        const wheelElementStyle = window.getComputedStyle(wheelElement)
        const wheelElementTransform = wheelElementStyle.getPropertyValue('transform')
        let translateX = 0

        if (wheelElementTransform && wheelElementTransform !== 'none') {
            const matrix = wheelElementTransform.match(/^matrix\((.+)\)$/)
            if (matrix) {
                const matrixValues = matrix[1].split(',')
                if (matrixValues.length >= 6) {
                    translateX = parseFloat(matrixValues[4])
                }
            }
        }

        if (translateX !== lastTranslateX) {
            // 
            // 
            lastTranslateX = translateX

            const currentCardIndex = Math.floor(-translateX / squareWidth) % roulette.numbers.length
            // const number = roulette.numbers[currentCardIndex]
            if (cardIndex !== currentCardIndex) {
                // 
                setCardIndex(currentCardIndex)
            }
        }
    }

    // if (typeof window === 'undefined') return <span className=" flex justify-center items-center text-white h-20 md:h-36 "><AiOutlineLoading3Quarters className="animate-spin text-custom-gray-400" /> </span>

    if (!isLoaded) return <span className=" flex justify-center items-center text-white h-20 md:h-36 "><AiOutlineLoading3Quarters className="animate-spin text-custom-gray-400" /> </span>

    return (
        <>
            <div className={`relative w-full max-w-screen-2xl mx-auto h-20 md:h-36 flex overflow-hidden -z-10 animate-fadeIn ${!isLoaded && 'hidden'} `}>
                <div className="roulette-wrapper relative w-full flex items-center overflow-x-hidden">
                    <div className="roulette-selector rounded absolute z-10 w-0.5 h-full  bg-white opacity-70 left-1/2 -translate-x-1/2"></div>

                    <div ref={wheel} className="roulette-wheel shadow absolute left-1/2 flex items-start w-full">
                        <ul className={`roulette-rows flex flex-none text-white [&>li]:w-20 [&>li]:md:w-32 [&>li]:h-20 [&>li]:md:h-32 `}>
                            {
                                Array.from({length: (roulette.rows + 1) * roulette.numbers.length}, (_, index) => {
                                    const isCurrent: boolean = index % roulette.numbers.length == cardIndex
                                    return (
                                        <RouletteCard isCurrent={isCurrent} cardIndex={index} key={index} />
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}