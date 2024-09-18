"use client"

import useWindow from "@/hooks/useWindow"
import { useEffect, useState } from "react"

interface IRouletteConfig {
    rows: number;
    squareW: number;
    order: number[];
}

export default function RouletteRow({ rowKey, squareW = 6, selectedSquareNumber, rouletteObj, wheel: currentWheel }: { rowKey: number, squareW?: number, selectedSquareNumber: number, rouletteObj: IRouletteConfig, wheel: React.RefObject<HTMLDivElement>}) {

    // setInterval(() => {
    //     
    // }, 50)

    const [selectedSquare, setSelectedSquare] = useState(0)
    const [rowIndexState, setRowIndexState] = useState(0)

    let lastTranslateX = 0;

    useEffect(() => {

        if(rowKey < 0 || rowKey >= rouletteObj.rows) return
        // const trackRouletteInterval = setInterval(trackRoulette, 50);

        return () => {
            // clearInterval(trackRouletteInterval)
        }
    }, [])

    const trackRoulette = () => {
        const wheel = currentWheel.current
        if (!wheel) return

        const style = window.getComputedStyle(wheel);
        const transform = style.getPropertyValue('transform');
        let translateX = 0;

        if (transform && transform !== 'none') {
            const matrix = transform.match(/^matrix\((.+)\)$/);
            if (matrix) {
                const matrixValues = matrix[1].split(',');
                if (matrixValues.length >= 6) {
                    translateX = parseFloat(matrixValues[4]);
                }
            }
        }

        if (translateX !== lastTranslateX) {
            // TranslateX has changed, do something
            // 
            lastTranslateX = translateX;

            // 
            let rowIndex = Math.floor(-translateX / (rouletteObj.order.length * rouletteObj.squareW))

            let selectedSquare = Math.floor(-translateX / rouletteObj.squareW) % rouletteObj.rows
            let squareNumber = rouletteObj.order[selectedSquare]
            // 

            // 



            // 

            if(rowKey === rowIndex) {
                setSelectedSquare(selectedSquare)
                setRowIndexState(rowIndex)
                // 
                // 
            }
        }

        // square width = 1/15 of the row width

    }


    return (
        <ul className={`${rowIndexState == rowKey && 'opacity-90'}  row flex flex-none text-white [&>li]:w-12 [&>li]:md:w-24 [&>li]:h-12 [&>li]:md:h-24 
            [&:nth-child(${selectedSquare})]:opacity-50
        `} key={0}>
            <li className={`card bg-custom-green-500`}>{0}</li>

            <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>11</li>
            <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>5</li>
            <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>10</li>
            <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>6</li>
            <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>9</li>
            <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400
            ${rowKey == rowIndexState && 'bg-white' }`}>7</li>
            <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>8</li>
            <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>1</li>
            <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>14</li>
            <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>2</li>
            <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>13</li>
            <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>3</li>
            <li className={`card bg-custom-gray-700 bg-test-bg-custom-color bg-gradient-to-bl from-custom-gray-700 to-custom-gray-900`}>12</li>
            <li className={`card bg-gradient-to-tr from-custom-red-500 to-custom-red-400`}>4</li>
        </ul>
    )

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