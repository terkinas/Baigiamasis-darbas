"use client"

import { useEffect, useRef, useState } from "react"
import RouletteCard from "./RouletteCard"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useSocket } from "@/hooks/useSocket";
import { IClientRouletteRound } from "@/types/client/round.interface";
import { rouletteConfig } from "./config";
import NewRouletteRoundedCard from "./RouletteRoundedCard";

const roulette = {
    // numbers count = 15
    numbers: [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4],
    rows: 8,
}


export default function RouletteRoundedWheel({ roundId, outcomeNumber, setOutcomeNumber, updatedAt }: 
    { roundId: number | null, outcomeNumber: number | null, setOutcomeNumber: React.Dispatch<React.SetStateAction<number | null>>, updatedAt: Date | null }) {

    const { socket } = useSocket()

    // const rowWidth = -(roulette.numbers.length * squareWidth)
    // let squareWidth = typeof window !== 'undefined' && window.innerWidth > 768 ? rouletteConfig.cardWidth : rouletteConfig.cardWidthMobile;
    // let squareWidth = 128

    const [squareWidth, setSquareWidth] = useState(typeof window !== 'undefined' && window.innerWidth > 768 ? rouletteConfig.cardWidth : rouletteConfig.cardWidthMobile)
    
    const [resetX, setResetX] = useState(-(squareWidth*roulette.numbers.length))
    const [resetDeg, setResetDeg] = useState(-1080)

    const [cardIndex, setCardIndex] = useState(0)

    const [previousRoundId, setPreviousRoundId] = useState<number | null>(null)

    const [isLoaded, setIsLoaded] = useState(false);

    const wheel = useRef<HTMLDivElement>(null)



    let lastTranslateX = 0
    let lastLandingDeg = 0

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
        // 
        // wheel.current.style.transform = `translateX(-${squareWidth*roulette.numbers.length}px)`
        wheel.current.style.transform = `rotate(0deg)`;

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
        // wheelElement.style.transform = `translateX(${resetX}px)`
        wheelElement.style.transform = `rotate(${resetDeg}deg)`

    
        const position = roulette.numbers.indexOf(outcome)
        // const landingX = ((roulette.rows - 1) * roulette.numbers.length * squareWidth) + (position * squareWidth) + (squareWidth)
        const landingDeg = -((360 / roulette.numbers.length) * position) - (Math.floor(Math.random() * 24) - 12)

        // const finalLandingX = landingX - (squareWidth / 2)
        // const finalLandingX = landingX - (Math.floor((Math.random() * (squareWidth - 2) + 1)))
        // const finalLandingDeg = landingDeg - (Math.floor((Math.random() * (squareWidth - 2) + 1)))

        // 
        // 

        // 
        // 

        // setResetX(-(finalLandingX - ((roulette.rows - 2) * roulette.numbers.length * squareWidth)))
        setResetDeg(landingDeg + 1080)

        const wheelElementStyle = window.getComputedStyle(wheelElement)
        const wheelElementTransform = wheelElementStyle.getPropertyValue('transform')
        let translateX = 90

        if (wheelElementTransform && wheelElementTransform !== 'none') {
            // const matrix = wheelElementTransform.match(/^matrix\((.+)\)$/)
            // if (matrix) {
            //     const matrixValues = matrix[1].split(',')
            //     if (matrixValues.length >= 6) {
            //         translateX = parseFloat(matrixValues[4])

            //         // if (translateX == resetX) {
            //         //     wheelElement.style.transition = `transform ${rouletteConfig.spinTime/1000}s cubic-bezier(0.275, 0.2, 0.165, 1)`
            //         //     wheelElement.style.transform = `translateX(${-finalLandingX}px)` 
            //         // }
            //         if (translateX == resetDeg) {
            //             wheelElement.style.transition = `transform ${rouletteConfig.spinTime/1000}s`
            //             wheelElement.style.transform = `rotate(${landingDeg}deg)` 
            //         }
            //     }
            // }

         
                wheelElement.style.transition = `transform ${rouletteConfig.spinTime/1000}s cubic-bezier(0.275, 0.2, 0.165, 1)`
                wheelElement.style.transform = `rotate(${landingDeg}deg)` 
            
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

        let landingDeg = 0;

        if (wheelElementTransform && wheelElementTransform !== 'none') {
            const matrix = wheelElementTransform.match(/^matrix\((.+)\)$/);
            if (matrix) {
                const matrixValues = matrix[1].split(',').map(parseFloat);
    
                if (matrixValues.length >= 6) {
                    const a = matrixValues[0];
                    const b = matrixValues[1];
    
                    // Calculate the raw rotation in degrees
                    let rotationDegrees = Math.atan2(b, a) * (180 / Math.PI);
    
                    // Normalize to the range -360 to 0
                    rotationDegrees = ((rotationDegrees % 360) + 360) % 360; // Normalize to 0-360
                    if (rotationDegrees > 0) {
                        rotationDegrees -= 360; // Shift to -360 to 0
                    }

                    landingDeg = rotationDegrees
                }
            }
        }

        if (landingDeg !== lastLandingDeg) {
            lastLandingDeg = landingDeg

            const currentCardIndex = -(Math.floor((landingDeg + 12) / (360 / roulette.numbers.length)) % roulette.numbers.length)

            if (cardIndex !== currentCardIndex) {
                setCardIndex(currentCardIndex)
            }
        }

    //     if (translateX !== lastTranslateX) {
    //         // 
    //         // 
    //         lastTranslateX = translateX

    //         const currentCardIndex = Math.floor(-translateX / squareWidth) % roulette.numbers.length

    //         // based on degrees
    //         // const currentCardIndex = Math.floor(24 + landing)
    //         // const number = roulette.numbers[currentCardIndex]
    //         // if (cardIndex !== currentCardIndex) {
    //         //     // 
    //         //     setCardIndex(currentCardIndex)
    //         // }
    //     }
    }


    // if (typeof window === 'undefined') return <span className=" flex justify-center items-center text-white h-20 md:h-36 "><AiOutlineLoading3Quarters className="animate-spin text-custom-gray-400" /> </span>

    if (!isLoaded) return <span className=" flex justify-center items-center text-white h-20 md:h-36 "><AiOutlineLoading3Quarters className="animate-spin text-custom-gray-400" /> </span>

    return (
        <>
            <div className={`relative rotate-180 scale-75 md:scale-100 w-full max-w-screen-2xl mx-auto h-96 my-24 flex justify-center items-center -z-10 animate-fadeIn ${!isLoaded && 'hidden'} `}>
               
                    <div className="roulette-selector rounded absolute z-10 w-1 h-24  bg-white opacity-70 left-1/2 -translate-x-1/2 bottom-0 translate-y-[calc(100%-16px)]"></div>

                    <div className="absolute w-96 h-96 rounded-full scale-[140%] border border-4 border-custom-gray-700 bg-custom-gray-800"></div>
                    

                    <div className="rotate-90">


                        <div ref={wheel} className="roulette-wheel shadow flex items-center justify-center bg-custom-gray-800">
                            <ul className={`roulette-rows flex  items-center justify-center h-full w-full flex flex-none text-white [&>li]:w-20 [&>li]:h-20`}>
                                {
                                    Array.from({length: roulette.numbers.length}, (_, index) => {
                                        const isCurrent: boolean = index % roulette.numbers.length == cardIndex
                                        // console.log('arrayinfo', index, cardIndex)
                                        return (
                                            <NewRouletteRoundedCard isCurrent={isCurrent} cardIndex={index} key={index} />
                                        )
                                    })
                                }
                            </ul>

                            <div className="absolute flex items-center justify-center">
                            
                                <div className="absolute flex items-center justify-center">
                                    <span className="absolute block w-28 h-2 bg-custom-gray-900 rounded"></span>
                                    <span className="absolute block w-2 h-28 bg-custom-gray-900 rounded"></span>
                                </div>

                                <div className="relative w-24 h-24 rotate-90 shadow-[0_0_20px_5px_rgba(0,0,0,0.5)] bg-custom-gray-800  rounded-lg scale-[50%]"></div>
                                
                            </div>

                        </div>
                    </div>

                    
                
            </div>



            {/* <div className="relative w-64 h-64 flex items-center justify-center">
                {roulette.numbers.map((number, index) => {
                    const angle = (360 / roulette.numbers.length) * index; // Calculate the angle for each number
                    return (
                        <div
                        key={index}
                        className="absolute w-12 h-12 bg-blue-500 text-white flex items-center justify-center "
                        style={{
                            transform: `rotate(${angle}deg) translate(8rem)`,
                            }}
                            >
                            <span 
                            style={{ transform: `rotate(${-angle}deg)` }}
                            >{number}</span>
                    </div>
                    );
                })}

                <div className="">
                    <div className="absolute w-64 h-64 scale-90 bg-white rounded-full"></div>
                    <div className=" w-64 h-64 scale-[135%] rounded-full border border-[24px] border-red-500"></div>
                </div>
            </div> */}




        </>
    )
}