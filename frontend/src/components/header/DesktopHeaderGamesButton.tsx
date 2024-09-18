"use client"

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoArrowDown, IoChevronDownCircleOutline } from "react-icons/io5";
import { FaAngleDown, FaRegTimesCircle } from "react-icons/fa";
import { GiCartwheel, GiCrossedAxes, GiTwoCoins } from "react-icons/gi";
import { Button } from "../ui/Button";
import { CgDice4 } from "react-icons/cg";
import { LuSwords } from "react-icons/lu";
import { FaLandMineOn } from "react-icons/fa6";

export default function DesktopHeaderGamesButton() {

    const disabledGamesClass = "opacity-50 cursor-not-allowed"

    return (
        <>
            <Menu as="div" className="relative inline-block text-left z-50">
                <div>
                <Menu.Button className="h-10 bg-custom-gray-500 px-4 flex items-center gap-1 text-sm hover:bg-custom-gray-600 cursor-pointer rounded" >
                        Games
                        <FaAngleDown />
                </Menu.Button>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="absolute mt-3  origin-top-right divide-y 
                divide-gray-100 rounded-sm border-x-2 border-custom-gray-700
                bg-custom-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-custom-gray-700' : 'text-white'
                            } group flex text-white gap-1 w-full items-center rounded-md px-3 py-2 text-base ${disabledGamesClass}`}
                        >
                            {/* <GiCrossedAxes 
                                className="mr-2 h-7 w-7 text-custom-yellow-500"
                                aria-hidden="true"
                                
                            /> */}
                            <LuSwords  
                            className="mr-2 h-7 w-7 text-custom-red-500" />

                            <div className="flex flex-col items-start">
                                <h6 className="tracking-wide font-semibold">Battles</h6>
                                <p className="text-xs text-gray-500 whitespace-nowrap">Pvp Case Opening</p>
                            </div>
                        </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-custom-gray-700' : 'text-white'
                            } group flex text-white gap-1 w-full items-center rounded-md px-3 py-2 text-base`}
                        >
                            {/* <GiCrossedAxes 
                                className="mr-2 h-7 w-7 text-custom-yellow-500"
                                aria-hidden="true"
                                
                            /> */}
                            <GiCartwheel 
                            className="mr-2 h-7 w-7 text-custom-red-500" />

                            <div className="flex flex-col items-start">
                                <h6 className="tracking-wide font-semibold">Roulette</h6>
                                <p className="text-xs text-gray-500 whitespace-nowrap">Spin to win!</p>
                            </div>
                        </button>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-custom-gray-700' : 'text-white'
                            } group flex text-white gap-1 w-full items-center rounded-md px-3 py-2 text-base ${disabledGamesClass}`}
                        >
                            {/* <GiCrossedAxes 
                                className="mr-2 h-7 w-7 text-custom-yellow-500"
                                aria-hidden="true"
                                
                            /> */}
                            <FaLandMineOn   
                            className="mr-2 h-7 w-7 text-custom-red-500" />

                            <div className="flex flex-col items-start">
                                <h6 className="tracking-wide font-semibold">Mines</h6>
                                <p className="text-xs text-gray-500 whitespace-nowrap">Unocver the mines</p>
                            </div>
                        </button>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-custom-gray-700' : 'text-white'
                            } group flex text-white gap-1 w-full items-center rounded-md px-3 py-2 text-base ${disabledGamesClass}`}
                        >
                            {/* <GiCrossedAxes 
                                className="mr-2 h-7 w-7 text-custom-yellow-500"
                                aria-hidden="true"
                                
                            /> */}
                            <CgDice4  
                            className="mr-2 h-7 w-7 text-custom-red-500" />

                            <div className="flex flex-col items-start">
                                <h6 className="tracking-wide font-semibold flex">Dice <span className="text-xs ml-1 font-light text-purple-500">New!</span></h6>
                                <p className="text-xs text-gray-500 whitespace-nowrap">Roll the dice</p>
                            </div>
                        </button>
                        )}
                    </Menu.Item>

                    
                    </div>
                

                </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}