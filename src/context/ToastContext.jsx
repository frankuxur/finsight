import { createContext, useState } from "react"

export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [showToast, setShowToast] = useState(false)
    const [toastData, setToastData] = useState({})
    // toastData - icon, message, color

    const value = {
        showToast,
        setShowToast,
        toastData,
        setToastData,
    }

    return(
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    )
}