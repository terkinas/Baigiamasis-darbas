import { MdOutlineCasino } from "react-icons/md";
import { Button } from "../ui/Button";
import AuthenticationButton from "../ui/buttons/AuthenticationButton";
import Image from "next/image";
import { FaHouse } from "react-icons/fa6";
import { FaAngleDown, FaSafari } from "react-icons/fa";
import { AiFillBell, AiOutlineSwap } from "react-icons/ai";
import { DepositButton, SignInButton, WithdrawButton } from "./sidebar/SidebarClientComponents";
import DesktopHeaderGamesButton from "./DesktopHeaderGamesButton";
import { FaInstagram } from "react-icons/fa";

import dynamic from 'next/dynamic';
import Link from "next/link";
import ClaimRewardButton from "./ClaimRewardButton";

const BalanceSquared = dynamic(() => import('../ui/balances/BalanceSquared'), {
  ssr: false,
});

// const DesktopHeaderGamesButton = dynamic(() => import('./DesktopHeaderGamesButton'), {
//   ssr: false,
// });

// const { SignInButton, WithdrawButton } = dynamic(() => import('./sidebar/SidebarClientComponents'), {
//   ssr: false,
// });

export default function DesktopHeader() {
  return (
    <div className="flex flex-row w-full hidden md:flex">
      <div className="w-full flex justify-between px-4 gap-4">
      
        {/* left side */}
        <div className="flex w-full h-full items-center gap-3 text-custom-gray-400">
              <Link href="/" className="h-10 min-w-72  hidden xl:flex items-center justify-center cursor-pointer rounded"> <Image src="/images/logos/full-logo.png" width={220} height={10} className="p-4 pr-8" alt="logo" /> </Link>

              <Link href="/" className="h-10 w-10 bg-custom-gray-500 flex items-center justify-center hover:bg-custom-gray-600 cursor-pointer rounded"> <FaHouse /> </Link>

              <DesktopHeaderGamesButton />

              {/* <div className="h-10 bg-custom-gray-500 px-4 flex items-center gap-1 text-sm hover:bg-custom-gray-600 cursor-pointer rounded"> Games <FaAngleDown />  </div> */}

              <div className="h-5 w-px bg-custom-gray-500"></div>

              <a target="_blank" href="https://www.instagram.com/betitfy/" rel="noopener noreferrer" className="h-10 w-10 bg-custom-gray-500 flex items-center justify-center hover:bg-custom-gray-600 cursor-pointer rounded"> <FaInstagram className="text-lg" /> </a>
          </div>

        {/* right side */}
        <div className="flex w-full h-full flex justify-end items-center gap-3">
          
          <BalanceSquared />

          {/* <Button variant="secondary" size="default" className="h-10">Deposit</Button> */}
          <DepositButton />
          {/* <Button variant="default" size="default" className="h-10 bg-custom-green-500 text-custom-gray-900">Withdraw</Button> */}
   
          <ClaimRewardButton />

          <Button variant="secondary" size="default" className="h-10 w-10 p-0 flex justify-center items-center text-base"><AiOutlineSwap /></Button>
          
          <SignInButton />
        </div>

      </div>
    </div>
  );
}