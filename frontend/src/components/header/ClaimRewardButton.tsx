"use client"

import { useUser } from "@/hooks/useUser";
import { claimCoinsReward } from "@/lib/clientRequests";
import { useEffect, useState } from "react";

export default function ClaimRewardButton() {

    const { user, updateUser, requestMe } = useUser() ?? { user: null };

    const [lastClaimedTime, setLastClaimedTime] = useState<number | null>(null);

    useEffect(() => {
        if (user) {
            console.log(user)
            console.log(user.balance.lastClaimed)
            setLastClaimedTime(user.balance.lastClaimed);
        }
    }, [user]);

    if (!user) {
        return null;
    }


    // const now = new Date().getTime(); // Correctly invoking getTime() method

    // // Calculate the last claimed time in milliseconds
    // const lastClaimedTime = new Date(user.balance.lastClaimed).getTime(); // Ensure it's in milliseconds

    // // Calculate the difference in milliseconds
    // const differenceInMillis = now - lastClaimedTime; // Correct arithmetic operation

    // // Check if 24 hours have passed (86400000 milliseconds)
    // const has24HoursPassed = differenceInMillis >= 86400000;

    return (
        <button
        onClick={async () => {
            let data = await claimCoinsReward()
            
            if (data.message === 'Coins claimed successfully') {
                requestMe()
            }
        }}
        className={`text-sm bg-custom-gray-500 hover:bg-custom-gray-600 focus:ring-1 focus:outline-none rounded text-center dark:bg-custom-gray-600
        h-10 w-full md:w-fit p-0 flex justify-between items-center text-base px-2 gap-2 whitespace-nowrap
        ${lastClaimedTime && 
        new Date().getTime() - lastClaimedTime >= 86400000 ? 'text-green-500' : 'text-red-500'}
         `}>

            {JSON.stringify(lastClaimedTime)}
            {lastClaimedTime && `Claim in ${new Date(86400000 - (new Date().getTime() - lastClaimedTime)).toISOString().substr(11, 8)}`}
          
            Claim Reward
          
        </button>
    )
}