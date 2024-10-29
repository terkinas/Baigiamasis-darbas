"use client"

import { useUser } from "@/hooks/useUser";
import { claimCoinsReward } from "@/lib/clientRequests";
import { useEffect, useState } from "react";
import RewardCountdown from "./CountDownTimer";
const REWARD_INTERVAL = 24 * 60 * 60 * 1000;

export default function ClaimRewardButton() {

    const { user, updateUser, requestMe } = useUser() ?? { user: null };

    const [lastClaimedTime, setLastClaimedTime] = useState<number | null>(null);

    useEffect(() => {
        if (user) {
            console.log(user)
            console.log(user.balance.lastClaimed)
            setLastClaimedTime(user.balance.lastClaimed)
        }
    }, [user]);


    if (!user) {
        return null;
    }

    return (
        <button
        onClick={async () => {
            // Function to calculate the time differenc
            if (lastClaimedTime == null) {
                return
            }
                const currentTime = new Date().getTime(); // Get current time in ms
                const lastRewardTime = new Date(lastClaimedTime).getTime(); // Convert last reward timestamp to ms
                const nextRewardTime = lastRewardTime + REWARD_INTERVAL;
                let isPending =  nextRewardTime - currentTime;
              
                if (isPending > 0) {
                    return
                }

            let data = await claimCoinsReward()
            
            if (data.message === 'Coins claimed successfully') {
                requestMe()
            }
        }}
        className={`text-sm bg-custom-gray-500 hover:bg-custom-gray-600 focus:ring-1 focus:outline-none rounded text-center dark:bg-custom-gray-600
        h-10 w-full md:w-fit p-0 flex justify-between items-center text-base px-2 md:px-4 gap-2 whitespace-nowrap
        ${lastClaimedTime && 
        new Date().getTime() - lastClaimedTime >= 86400000 ? 'text-green-500' : 'text-custom-gray-400'}
         `}>

        

            <RewardCountdown lastRewardTimestamp={lastClaimedTime ? lastClaimedTime : 0} />
          
        </button>
    )
}