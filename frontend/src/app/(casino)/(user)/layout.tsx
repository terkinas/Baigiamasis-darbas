"use client"

import { useModal } from "@/hooks/useModal";
import UserNavigation from "./Navigation";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect, useLayoutEffect, useState } from "react";
import { IClientUser } from "@/types/client/user.interface";

export default function UserLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    // const { user: initialUser } = useUser() ?? { user: null };
    // const { toggleModal, openModal } = useModal()

    // const [user, setUser] = useState<IClientUser | null>()

    // useEffect(() => {
    //     setUser(initialUser)

        
    // }, [initialUser])


    // if (!user) {
    //     toggleModal('authentication')
    //     openModal()
    //     redirect('/')
    // }

    // const { toggleModal, openModal } = useModal()
    // const { user } = useUser() ?? { user: null };


    // if (!user) {
    //     toggleModal('authentication')
    //     openModal()
    // }

    

    return (
        <div className="w-full lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10">



        <div className="mx-auto">
        {/* <div className="max-w-7xl mx-auto"> */}

        <UserNavigation />

        {children}
        </div>

    </div>
    );
  }