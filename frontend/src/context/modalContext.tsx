"use client"

import { createContext, useState } from "react";

interface ModalContextProps {
    modal: ModalState;
    toggleModal: (key: keyof ModalState) => void;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

interface ModalState {
    authentication: boolean;
}

const initialModalState: ModalState = {
    authentication: false,
    // Initialize other modal states as needed
};

export const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [modal, setModal] = useState<ModalState>({
        authentication: false,
    });

    const toggleModal = (key: keyof ModalState) => {
        setModal(prevModalState => {
            const updatedState: ModalState = { ...initialModalState }; // Reset all to false
            updatedState[key] = true; // Set the target key to the opposite value
            return updatedState;
        });
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, modal, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};

