"use client"

import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { BsWallet2 } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineCash } from "react-icons/hi";
import { AiOutlineSwap } from "react-icons/ai";
import { useEffect, useState } from "react";
import { withdrawBitcoinFromBalance } from "@/lib/clientRequests";

export default function BitcoinWithdrawPage() {

  const [withdrawAmount, setWithdrawAmount] = useState(0.00)

  const [withdrawAddress, setWithdrawAddress] = useState('' as string)

  const [coins, setCoins] = useState<any>('')
  const [rateUSD, setRateUSD] = useState<any>('')
  const [cryptoAmount, setCryptoAmount] = useState<any>('')

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(res => res.json())
        .then(data => {
            setRateUSD(data.bitcoin.usd)
        })
}, [])
  
  function handleConvertion(event: any, inputType: string) {
    
    // setCryptoAmount(Number(coins) / Number(rateUSD))
    // setCoins(Number(cryptoAmount) * Number(rateUSD))

    if (inputType === 'coins') {
        setCoins(event.target.value);
        setCryptoAmount(Number(event.target.value) / Number(rateUSD));
    } else if (inputType === 'cryptoAmount') {
        setCryptoAmount(event.target.value);
        setCoins(Number(event.target.value) * Number(rateUSD));
    }
}

  function handleWithdraw() {
    withdrawBitcoinFromBalance(Number(coins), withdrawAddress)
  }

  return (
    <div className="max-w-xl mx-auto text-white py-6 flex flex-col gap-2">
      <h1 className="flex flex-row gap-2 text-xl">Withdraw with Bitcoin <Image className="object-contain" src="/images/payments/bitcoin.png" alt="Bitcoin" width={25} height={25} /> </h1>
      <p className="text-custom-gray-400 text-xs md:text-sm">You will receive your funds automatically after withdrawing LTC to the address you provide below.
      <br className="hidden md:block" /></p>

      <div className="w-full pt-6">
        <div className="flex flex-col w-full py-6 gap-2 px-4 md:px-8
        shadow-lg bg-custom-gray-700 rounded">
          <h5 className="flex flex-row gap-2 items-center"><BsWallet2 className="text-custom-gray-300" /> Wallet address</h5>

          <p className="uppercase text-xs text-custom-gray-400">Your bitcoin withdraw address</p>
          <div className="flex flex-row gap-2 items-center justify-between
          bg-custom-gray-900 hover:bg-custom-gray-800 cursor-pointer px-4 rounded py-0.5 md:py-0
          border border-custom-gray-600">
            {/* <span className="text-custom-gray-100 text-xs md:text-base">1KvW5Y6aC5q4u9JLjgQ9ZbQ4q2</span> */}
            <input value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} type="text" maxLength={57} className="bg-transparent outline-none w-full text-xs md:text-sm " placeholder="Your bitcoin wallet address" />
            <button className="flex flex-row gap-1 items-center p-2 rounded text-custom-gray-400 text-xs md:text-sm">
              <IoCopyOutline />
              <span>Paste</span>
            </button>
          </div>
          {/* <p className="text-xs text-center text-custom-gray-400">If enough balance, you{"'"}ll receive your funds in about <span className="text-custom-green-500">10</span> minutes</p> */}
          <div className="flex gap-3 items-center">
            <input className="w-10 md:w-6" type="checkbox" id="withdraw-confirm" name="withdraw-confirm" value="withdraw-confirm" />
            <p className="text-xs text-left text-custom-gray-400">By withdrawing I confirm that I have provided the correct information and am not eligible for a refund when providing incorrect information.</p>

          </div>




          
        </div>
      </div>

      <div className="w-full h-10 bg-custom-orange-500 bg-opacity-10 flex flex-row gap-3 items-center">
        <span className="h-full w-1 bg-custom-orange-500 rounded"></span>
        <h4 className="text-sm text-custom-orange-500">Only withdraw over the Bitcoin Network!</h4>
      </div> 

      <div className="hidden w-full h-16 bg-custom-red-500 bg-opacity-10 flex flex-row gap-3 items-center">
        <span className="h-full w-1 bg-custom-red-500 rounded"></span>
        <h4 className="text-sm text-custom-red-500">We do not support withdraws to Native Segwit wallets, please use different one!</h4>
      </div> 

      <div className="w-full py-6">
        <div className="flex flex-col w-full py-6 gap-4 px-4 md:px-8
        shadow-lg bg-custom-gray-700 rounded">
          <h5 className="flex flex-row gap-2 items-center"><HiOutlineCash className="text-custom-gray-300" /> Withdraw amount</h5>

          <div className="flex flex-row items-center gap-2 text-sm md:text-base">
            {/* <div className="w-full border border-custom-gray-600 shadow-lg rounded
            flex flex-row items-center bg-custom-gray-900 px-2">
              <GiTwoCoins className="text-custom-yellow-500 text-lg" />
              <input value={100} type="number" className="w-full h-full p-2 bg-transparent font-light rounded" placeholder="0.00" />
            </div>
            <AiOutlineSwap size={38} className="text-custom-gray-300" />
            <div className="w-full border border-custom-gray-600 shadow-lg rounded
            flex flex-row items-center bg-custom-gray-900 px-2">
              <Image src="/images/payments/litecoin.png" alt="Litecoin" width={16} height={16} className="object-contain" />
            
              <input value={0.00087024} type="number" className="w-full h-full p-2 bg-transparent font-light rounded" placeholder="0.00" />
            </div> */}

<div className="w-full border border-custom-gray-600 shadow-lg rounded
            flex flex-row items-center bg-custom-gray-900 px-2">
                <GiTwoCoins className="text-custom-yellow-500 text-lg" />
                <input onChange={(e) => setCoins(e.target.value)} 
                onBlur={(e) => handleConvertion(e, 'coins')} 
                value={coins} type="text" className="w-full h-full outline-none p-2 bg-transparent font-light rounded" placeholder="0.00" />
            </div>
            <AiOutlineSwap size={38} className="text-custom-gray-300" />
            <div className="w-full border border-custom-gray-600 shadow-lg rounded
            flex flex-row items-center bg-custom-gray-900 px-2">
                <Image src="/images/payments/bitcoin.png" alt="Bitcoin" width={16} height={16} className="object-contain" />
                {/* <GiTwoCoins className="text-custom-yellow-500 text-lg" /> */}
                <input onChange={(e) => setCryptoAmount(e.target.value)} 
                onBlur={(e) => handleConvertion(e, 'cryptoAmount')} 
                value={cryptoAmount} type="text" className="w-full h-full outline-none p-2 bg-transparent font-light rounded" placeholder="0.00" />
            </div>
          </div>

          <div className="w-full flex justify-center">

            <button onClick={handleWithdraw} className="w-full border border-custom-gray-600 hover:bg-custom-gray-800 right-0 px-6 py-2 text-sm rounded bg-custom-green-500 hover:bg-custom-green-400 text-custom-gray-100">Withdraw</button>
          </div>

          <div className="flex gap-1 justify-center">
            <p className="text-center text-xs md:text-sm text-custom-gray-400 flex gap-1 items-center">Min. Amount  <span className="flex items-center text-custom-gray-100 gap-1">10 <GiTwoCoins className="text-custom-yellow-500" /></span></p>
            <span>|</span>
            <p className="text-center text-xs md:text-sm text-custom-gray-400 flex gap-1 items-center">Est. Network Fee  <span className="text-custom-gray-100">2.85$</span></p>

          </div>
        </div>


      </div>

       

    </div>
  );
}