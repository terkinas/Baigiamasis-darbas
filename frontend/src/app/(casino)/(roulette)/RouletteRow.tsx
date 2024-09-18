"use client"

import useWindow from "@/hooks/useWindow"
import { useEffect, useState } from "react"

const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4]

export default function RouletteRow({ currentIndex }: { currentIndex: number}) {

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        // 
        setActiveIndex(currentIndex)

    }, [currentIndex])

    return (
        <ul className={` row flex flex-none text-white [&>li]:w-16 [&>li]:md:w-24 [&>li]:h-16 [&>li]:md:h-24 
        `}>
            <li className={`card ${activeIndex == 0 && 'opacity-75 font-bold'  } bg-custom-green-500`}>{0}</li>

            <li className={`card ${activeIndex == 1 && 'opacity-75 font-bold'  } bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>11</li>
            <li className={`card ${activeIndex == 2 && 'opacity-75 font-bold'  } bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>5</li>
            <li className={`card ${activeIndex == 3 && 'opacity-75 font-bold'  } bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>10</li>
            <li className={`card ${activeIndex == 4 && 'opacity-75 font-bold'  } bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>6</li>
            <li className={`card ${activeIndex == 5 && 'opacity-75 font-bold'  } bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>9</li>
            <li className={`card ${activeIndex == 6 && 'opacity-75 font-bold'  } bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>7</li>
            <li className={`card ${activeIndex == 7 && 'opacity-75 font-bold'  } bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>8</li>
            <li className={`card ${activeIndex == 8 && 'opacity-75 font-bold'  } bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>1</li>
            <li className={`card ${activeIndex == 9 && 'opacity-75 font-bold'  } bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>14</li>
            <li className={`card ${activeIndex == 10 && 'opacity-75 font-bold'  } bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>2</li>
            <li className={`card ${activeIndex == 11 && 'opacity-75 font-bold'  } bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>13</li>
            <li className={`card ${activeIndex == 12 && 'opacity-75 font-bold'  } bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>3</li>
            <li className={`card ${activeIndex == 13 && 'opacity-75 font-bold'  } bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>12</li>
            <li className={`card ${activeIndex == 14 && 'opacity-75 font-bold'  } bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>4</li>
        </ul>
    )

    // return (
    //     <ul className={` row flex flex-none text-white [&>li]:w-12 [&>li]:md:w-24 [&>li]:h-12 [&>li]:md:h-24 
    //     [&>li:nth-child(${activeIndex})]:opacity-50`}>
    //         <li className={`card bg-custom-green-500`}>{0}</li>

    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>11</li>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>5</li>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>10</li>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>6</li>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>9</li>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>7</li>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>8</li>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>1</li>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>14</li>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>2</li>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>13</li>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>3</li>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>12</li>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>4</li>
    //     </ul>
    // )

    // return (
    //     <div className='row flex flex-none' key={0}>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>1</div>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>14</div>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>2</div>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>13</div>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>3</div>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>12</div>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>4</div>
    //         <li className={`card bg-custom-green-500`}>{0}</div>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>11</div>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>5</div>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>10</div>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>6</div>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>9</div>
    //         <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>7</div>
    //         <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>8</div>
    //     </div>
    // )
}