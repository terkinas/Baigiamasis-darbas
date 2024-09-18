import { createContext } from "vm";

interface CryptoContextProps {
    crypto: string;
    setCrypto: (crypto: string) => void;

}

// export const CryptoContext = createContext<CryptoContextProps | null>(null);
