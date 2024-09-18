

import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { BsWallet2 } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { FaCalculator } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";
import { useEffect, useState } from "react";
import LitecoinCalculator from "./calculator";
import LitecoinDepositAddressWindow from "./address";
import dynamic from "next/dynamic";
import CryptoDepositCheckButton from "./check";
import { GrStatusUnknown } from "react-icons/gr";

// const LazyLitecoinDepositAddressWindow = dynamic(() => import('./address'), {
//   ssr: false,
// });

export default function LitecoinDepositPage() {



    


  return (
    <div className="max-w-xl mx-auto text-white py-6 flex flex-col gap-2">
      <h1 className="flex flex-row gap-2 text-xl">Deposit with litecoin <Image className="object-contain" src="/images/payments/litecoin.png" alt="Litecoin" width={25} height={25} /> </h1>
      <p className="text-custom-gray-400 text-xs md:text-sm">You will receive balance automatically after sending BTC to the address displayed below.
      <br className="hidden md:block" /> <span className="whitespace-nowrap">(1 confirmation required)</span></p>

      <LitecoinDepositAddressWindow />

      <div className="w-full h-10 bg-custom-orange-500 bg-opacity-10 flex flex-row gap-3 items-center">
        <span className="h-full w-1 bg-custom-orange-500 rounded"></span>
        <h4 className="text-sm text-custom-orange-500">Only deposit over the litecoin Network!</h4>
      </div> 

      <div className="w-full py-6">
        <div className="flex flex-col w-full py-6 gap-4 px-4 md:px-8
        shadow-lg bg-custom-gray-700 rounded">
          <h5 className="flex flex-row gap-2 items-center"><FaCalculator className="text-custom-gray-300" /> Coin rate calculator</h5>


          <LitecoinCalculator />

        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col w-full mx-auto py-6 gap-4 px-4 md:px-8
            shadow-lg bg-custom-gray-700 rounded">
              <h4 className="flex gap-2 items-center"><GrStatusUnknown className="text-custom-gray-300" /> Deposit status</h4>        
              <CryptoDepositCheckButton />
              
        </div>
      </div>

       

    </div>
  );
}