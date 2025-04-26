import { createContext, useContext, useState } from 'react';

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <AuthModalContext.Provider value={{ isAuthModalOpen, openAuthModal, closeAuthModal }}>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = () => useContext(AuthModalContext);
