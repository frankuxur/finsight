import { createContext, useState } from "react";

export const ModalContext = createContext(null)

export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState({})

    const value = {
        showModal,
        setShowModal,
        modalData,
        setModalData,
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}