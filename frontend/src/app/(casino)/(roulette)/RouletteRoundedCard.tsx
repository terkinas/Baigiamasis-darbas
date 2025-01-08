"use client"

import { GiSpades, GiClover, GiHearts } from "react-icons/gi";

const rouletteNumbers = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4]

export default function NewRouletteRoundedCard({ isCurrent, cardIndex}: { isCurrent: boolean ,cardIndex: number }) {
    
    const number = rouletteNumbers[cardIndex % rouletteNumbers.length];

    // 
    // 
    // 

    const isBlack = [11, 10, 9, 8, 14, 13, 12].includes(number);
    const isGreen = rouletteNumbers[number] === 0;

    const angle = (360 / rouletteNumbers.length) * cardIndex;

    return (
        <li style={{
            transform: `rotate(${angle}deg) translate(14rem)`,
            }} 
            className={`roulette-card p-1 md:p-0.5 absolute rounded shadow-[0px_0px_30px_rgba(0,0,0,0.15)] transition duration-300 ${isCurrent ? `bg-custom-gray-300  ${isBlack ? 'shadow-custom-gray-200' : isGreen ? 'shadow-custom-green-500' : 'shadow-custom-red-500'}` : 'bg-custom-gray-700'}`}>
            <div className={` w-full h-full rounded shadow-2xl shadow-[inset_0_0px_24px_rgba(0,0,0,0.7)]
            flex items-center justify-center text-2xl md:text-3xl text-custom-gray-100 ${isCurrent ? 'text-opacity-100' : 'text-opacity-75'} font-semibold
                ${isBlack ? 'bg-custom-gray-600' : 
                isGreen ? 'bg-custom-green-500' : 'bg-gradient-to-tr from-custom-red-400 to-custom-red-500'}`}>
                    {/* {isBlack ? <GiSpades /> : isGreen ? <GiClover /> : <GiHearts />} */}
                    <span style={{
                        transform: `rotate(${90}deg)`,
                        }} className={`absolute ${isBlack ? 'text-custom-gray-400' : 'text-custom-gray-700'} text-opacity-50 text-sm bottom-2 right-2`}>
                    {isBlack ? <GiSpades /> : isGreen ? <GiClover /> : <GiHearts />}
                    </span>
                    <span style={{
                        transform: `rotate(${90}deg)`,
                        }}>{number}</span>


                    {/* {isGreen ? <CgTrophy /> : number } */}
            </div>
        </li>
    )
}

// blueish:
// bg-gradient-to-tr from-[#234dd8] to-[#49a7e9]