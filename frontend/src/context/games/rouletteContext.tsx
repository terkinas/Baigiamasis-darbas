"use client"

import useAxios from '@/hooks/useAxios';
import { IClientBet } from '@/types/client/bet.interface';
// import { IClientRouletteCurrent } from '@/types/client/roulette.interface';
import { createContext, useContext, useEffect, useState } from 'react';
import { set } from 'react-hook-form';

// interface RouletteContextProps {
//     roulette: IClientRouletteCurrent | null;
// }

interface RouletteContextProps {
    isOpen: boolean;
    roundId: number | null;
    outcome: string | null;
    createdAt: Date | null;
    bets: IClientBet[];
    updatedAt: Date | null;
    history: string[] | null;
}

export const RouletteContext = createContext<RouletteContextProps>( {} as RouletteContextProps );

export const RouletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { fetchData } = useAxios();

    // const [roulette, setRoulette] = useState<IClientRouletteCurrent | null>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [roundId, setRoundId] = useState<number | null>(null);
    const [outcome, setOutcome] = useState<string | null>(null);
    const [createdAt, setCreatedAt] = useState<Date | null>(null);
    const [bets, setBets] = useState<IClientBet[]>([]);
    const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
    const [history, setHistory] = useState<string[] | null>(null);

    useEffect(() => {
        const fetchRoulette = async () => {
            const response = await fetchData("/roulette/current", {});
            if (response) {
                

                setIsOpen(response.roulette.isOpen);
                setRoundId(response.roulette.id);
                setOutcome(response.roulette.outcome);
                setCreatedAt(response.roulette.createdAt);
                setBets(response.roulette.bets);
                setUpdatedAt(response.roulette.updatedAt)

                setHistory(response.history);
            }
        }

        fetchRoulette(); // Don't forget to call the function
    }, []);

    return (
        <RouletteContext.Provider value={{ isOpen, roundId, outcome, createdAt, bets, updatedAt, history  }}>
            {children}
        </RouletteContext.Provider>
    );
};

export const useRoulette = () => {
    const context = useContext(RouletteContext);
    if (context === undefined) {
        throw new Error('useRoulette must be used within a RouletteProvider');
    }
    return context;
}
