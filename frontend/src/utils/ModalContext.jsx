import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (err, success) => {
      setIsOpen(true);
      setSuccessMessage(success);
      setError(err);
    };
  
    const closeModal = () => {
      setIsOpen(false);
      setError(null);
    };
  
    return (
      <ModalContext.Provider value={{isOpen, error, successMessage, openModal, closeModal}}>
        {children}
      </ModalContext.Provider>
    )
}

