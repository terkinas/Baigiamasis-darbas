"use client"

import { useEffect, useState } from "react"

export default function LiveChatUsersCount() {

    const [usersCount, setUsersCount] = useState(76)

    useEffect(() => {

        const interval = setInterval(() => {
            if (usersCount < 70) {
                setUsersCount(usersCount + 1)
            } else if (usersCount > 80) {
                setUsersCount(usersCount - 1)
            } else {
                Math.random() > 0.5 ? setUsersCount(usersCount - 1) : setUsersCount(usersCount + 1)
            }
        }, Math.floor(Math.random() * 30000) + 5000)
        
        return () => {
            clearInterval(interval)
        }
    })

    return (
        <p className="tracking-wider font-semibold">{usersCount}</p>             
    )
}