import { IoLogoGameControllerB } from "react-icons/io";
import { MdOutlineCasino } from "react-icons/md";
import { Button } from "../ui/Button";
import SidebarToggleButton from "./sidebar/SidebarToggleButton";
import AuthenticationButton from "../ui/buttons/AuthenticationButton";
import Link from "next/link";
import Image from "next/image";


export default function MobileHeader() {
  return (
    <div className="w-full flex flex-col md:hidden">
      <div className="w-full flex justify-between px-4">

        <div className="flex h-16 items-center">
          <div className="flex-1 p-1">
            <Link href="/" className="text-2xl font-bold text-white"> <Image src="/images/logos/small-logo.png" width={34} height={34} className="" alt="logo" /> </Link>
          </div>
        </div>

        <div className="flex h-16 items-center">
          <div className="flex-1">
            <AuthenticationButton />
          </div>
        </div>

        <div className="flex h-16 items-center">
          <div className="flex-1 flex items-center text-white">
            <SidebarToggleButton />
          </div>
        </div>

      </div>
    </div>
  );
}