"use client"

import { useRoulette } from "@/context/games/rouletteContext";
import { useEffect, useState } from "react";
import { GiSpades, GiClover, GiHearts } from "react-icons/gi";
import { GoHistory } from "react-icons/go";

export default function RouletteMiniHistory({ history }: { history: string[] | null }) {

    // const { history: initialHistory } = useRoulette() ?? { history: [] };

    if (!history) {
        return <div className="h-5 md:h-10"></div>
    }

    return (
        <div className="flex flex-col gap-2">
            {/* <h4 className="text-custom-gray-100 text-sm">History:</h4> */}
        <div className="flex gap-2 md:gap-4 items-center animate-fadeIn">
            <ul className="flex gap-1 flex-row-reverse
            [&>li]:w-5 [&>li]:h-5 [&>li]:md:w-10 [&>li]:md:h-10 [&>li]:shadow-2xl [&>li]:flex [&>li]:items-center [&>li]:justify-center
            [&>li]:text-xs [&>li]:md:text-base [&>li]:text-custom-gray-900 [&>li]:text-opacity-70 [&>li]:font-semibold [&>li]:shadow-[inset_0_0px_16px_rgba(0,0,0,0.4)]">


                    {history.map((outcome, index) => (
                        <li key={index} className={`rounded 
                        ${outcome == 'red' ? 'bg-gradient-to-tr from-custom-red-400 to-custom-red-500' : `
                        ${outcome == 'black' ? 'bg-custom-gray-500': `
                        ${outcome == 'green' && 'bg-custom-green-500'}`}`}`}>

                            {outcome === 'red' ? <GiHearts /> : (
                                outcome === 'black' ? <GiSpades /> : (
                                    outcome === 'green' && <GiClover />
                                )
                            )}

                        </li>
                    ))}

            </ul>
            <span className="text-custom-gray-400"><GoHistory className="text-xs md:text-base" /></span>
        </div>

        </div>
    )
}