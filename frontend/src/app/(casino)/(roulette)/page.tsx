import Link from "next/link";
import { BsCheck2Circle } from "react-icons/bs";
import RouletteMiniHistory from "./RouletteMiniHistory";
// import RouletteGame from "./RouletteGame";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const RouletteGame = dynamic(() => import('./RouletteGame'))

export const metadata = {
  title: "Betitfy | Betting Made Simple and Fun",
  description: "Enjoy easy and fun betting on roulette and more. Join now for a hassle-free, secure experience and win big with Betitfy!"
};

export default function RoulettePage() {
  return (
    <div className="w-full min-h-screen lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10">
      <div className="max-w-9xl mx-auto">

        <h1 className="text-3xl font-semibold text-custom-gray-100">Roulette</h1>

        <div className="flex flex-col gap-8">
          <div className="w-full flex flex-col">
            <div className="w-full h-10 flex items-center text-custom-gray-400 text-sm" >
                <Link className="cursor-pointer flex items-center gap-1 hover:text-custom-gray-100" href="/fairness">
                    <BsCheck2Circle />
                    Provably Fair
                </Link>
            </div>   
          </div>

          

          {/* roulette wheel */}
          
          <RouletteGame />
          




          {/* test */}
          {/* <div className="mt-12 w-full bg-blue-200 h-16 flex overflow-hidden"> */}
            {/* <div className="wrapper relative w-screen h-16 bg-red-100
            flex overflow-hidden">
            
            </div> */}
            {/* <div className="w-2/3 h-32 bg-red-100"> </div>
            <div className="w-2/3 h-32 bg-green-500"> </div>
          </div> */}

        </div>

        

      </div>
    </div>
  );
}
