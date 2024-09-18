
import Image from "next/image";
import { FaCalculator } from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";
import ProfileCard from "./ProfileCard";
import { useUser } from "@/hooks/useUser";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import { IClientUser } from "@/types/client/user.interface";
import { redirect } from "next/navigation";

export default function ProfilePage() {

    return (
        <div className="max-w-xl mx-auto text-white py-6 flex flex-col gap-4">


        <ProfileCard />

      <div className="w-full h-10 bg-custom-orange-500 bg-opacity-10 flex flex-row gap-3 items-center">
        <span className="h-full w-1 bg-custom-orange-500 rounded"></span>
        <h4 className="text-xs md:text-sm text-custom-orange-500">Level system is in development state, will be released soon</h4>
      </div> 


      {/* <div className="w-full">
        <div className="flex flex-col w-full mx-auto py-6 gap-4 px-4 md:px-8
        shadow-lg bg-custom-gray-700 rounded">
          <h4 className="flex gap-2 items-center"><GrStatusUnknown className="text-custom-gray-300" /> Deposit status</h4>
          
          
        </div>
      </div> */}

       

    </div>
    )
}