import Link from "next/link";
import BlackjackCard from "../components/blackjackCard";
import { BsCheck2Circle } from "react-icons/bs";
import Image from "next/image";

export default function BlackjackPage() {
  return (
    <div>
        
        <div className="w-full min-h-screen lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10">
            <div className="max-w-9xl mx-auto">

                <h1 className="text-3xl font-semibold text-custom-gray-100">Blackjack</h1>

                <div className="flex flex-col gap-8">
                
                <div className="w-full flex flex-col">
                    <div className="w-full h-10 flex items-center text-custom-gray-400 text-sm" >
                        <Link className="cursor-pointer flex items-center gap-1 hover:text-custom-gray-100" href="/fairness">
                            <BsCheck2Circle />
                            Provably Fair
                        </Link>
                    </div>   
                </div>


                <div className="flex flex-col w-full h-fit">

                    <Image src="/images/blackjack/card-dealer.png" width={120} height={120} className="w-24 h-24 mx-auto" alt="blackjack table" objectFit="contain" />

                    <div className="w-full lg:w-1/2 h-full bg-[#369499] border border-8 outline outline-4 outline-[#A0667E] border-[#783759] 
                    shadow shadow-custom-gray-500 mx-auto rounded-full flex py-3 gap-8 flex-col justify-between items-center">
                    
                        <div id="suffler" className="flex flex-row gap-2">
                            <BlackjackCard />
                            <BlackjackCard />
                        </div>
                        
                        <div id="client" className="flex flex-row gap-2">
                            <BlackjackCard />
                            <BlackjackCard />
                        </div>

                    </div>
                </div>

                <div className="flex flex-row gap-4 w-full">
                    <div className="buttons flex flex-row mx-auto gap-2">
                        <button className="bg-custom-gray-500 text-custom-gray-100 px-4 py-2 rounded">Hit</button>
                        <button className="bg-custom-gray-500 text-custom-gray-100 px-4 py-2 rounded">Stand</button>
                    </div>
                </div>

                
                </div>
            </div>
        </div>
    </div>
  );
}