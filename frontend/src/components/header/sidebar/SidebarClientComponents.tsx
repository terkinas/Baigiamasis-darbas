"use client"

import { Button } from "@/components/ui/Button";
import { useModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlineUser } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { useRouter } from "next/navigation"
import Link from "next/link";

export function DepositButton() {

  const router = useRouter()

  return (
    <Button onClick={() => {
      router.push('/deposit')
    }} variant='secondary' className="w-full md:w-fit">
      Deposit
    </Button>
  );
}

export function WithdrawButton() {

  const router = useRouter()

  return (
    <Button
      onClick={() => router.push('/withdraw')}
      variant='secondary' className="w-full  md:w-fit">
      Withdraw
    </Button>
  );
}

export function SignInButton() {

  const { user } = useUser() ?? { user: null };
  const { toggleModal, openModal } = useModal();

  if (user) {
    return (
      <Link href="/profile" className="text-sm text-custom-gray-400 bg-custom-gray-500 hover:bg-custom-gray-600 focus:ring-1 focus:outline-none rounded text-center dark:bg-custom-gray-600
      h-10 w-full md:w-fit p-0 flex justify-between items-center text-base px-2 gap-2 ">

        <div className="bg-custom-gray-700 min-w-7 h-7 flex justify-center items-center rounded"><AiOutlineUser  /></div>
        
        <div className="flex flex-col justify-center items-start w-full gap-1">
            <h4 className="text-xs"><p className="text-white"> {user?.username}</p></h4>
            <p className="min-w-24 w-full h-0.5 bg-gradient-to-r from-green-500 to-custom-green-500 rounded"></p>
        </div> 
            
        <FaAngleDown className="block text-sm" /> 
      </Link>
    )
  }

  return (
    <Button onClick={() => {
      toggleModal('authentication')
      openModal()
    }} variant='secondary' className="shadow bg-custom-green-500 text-white whitespace-nowrap">
      Sign In
    </Button>
  );
}