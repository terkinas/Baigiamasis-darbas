"use client"

import { GiSpades, GiClover, GiHearts } from "react-icons/gi";

const rouletteNumbers = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4]

export default function NewRouletteCard({ isCurrent, cardIndex}: { isCurrent: boolean ,cardIndex: number }) {
    
    const number = rouletteNumbers[cardIndex % rouletteNumbers.length];

    // 
    // 
    // 

    const isBlack = [11, 10, 9, 8, 14, 13, 12].includes(number);
    const isGreen = rouletteNumbers[number] === 0;

    return (
        <li className={`roulette-card p-1 md:p-2  transition duration-300 ${isCurrent ? 'bg-custom-gray-300' : 'bg-custom-gray-600'}`}>
            <div className={` w-full h-full rounded shadow-2xl shadow-[inset_0_0px_24px_rgba(0,0,0,0.7)]
            flex items-center justify-center text-2xl md:text-5xl text-custom-gray-900 text-opacity-70 font-semibold
                ${isBlack ? 'bg-custom-gray-600' : 
                isGreen ? 'bg-custom-green-500' : 'bg-gradient-to-tr from-custom-red-400 to-custom-red-500'}`}>
                    {isBlack ? <GiSpades /> : isGreen ? <GiClover /> : <GiHearts />}
                    {/* {isGreen ? <CgTrophy /> : number } */}
            </div>
        </li>
    )
}

// blueish:
// bg-gradient-to-tr from-[#234dd8] to-[#49a7e9]