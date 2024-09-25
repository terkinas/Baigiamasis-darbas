"use client"

import useAxios from "@/hooks/useAxios";
import { logoutRequest } from "@/lib/clientRequests";
import { IClientUser } from "@/types/client/user.interface";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface UserContextProps {
    user: IClientUser | undefined;
    // setUser: (user: IClientUser) => void;
    updateUser: (user: IClientUser) => void;
    increaseUserBalance: (user: IClientUser ,balance: number) => void;
    signIn: (user: IClientUser) => void;
    signOut: () => void;
    requestMe: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IClientUser | undefined>(undefined);

    const { fetchData } = useAxios();

    const signIn: (user: IClientUser) => void = (user: IClientUser) => {
        setUser(user);
    }

    const updateUser: (user: IClientUser) => void = (user: IClientUser) => {
        setUser(user);
    }

    const increaseUserBalance = (user: IClientUser ,balance: number) => {
        if (user) {
            const updatedUser = { ...user }
            updatedUser.balance.amount = Math.floor((user.balance.amount + balance) * 100) / 100;
            setUser(updatedUser);
        }
    }

    const signOut = async () => {
        const logout = await logoutRequest();
        if (logout) {
            setUser(undefined);
        }
        // const { data, error, isLoading } = useAxios("/api/auth/logout", {});
    }

    const requestMe = async () => {
        const meUser = await fetchData("/user/me");
        if (meUser !== undefined) {
            
            setUser(meUser);
        }
    }

    useEffect(() => {

        requestMe();

        return () => {
            // cleanup
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, signIn, updateUser, increaseUserBalance, signOut, requestMe }}>
            {children}
        </UserContext.Provider>
    );
};