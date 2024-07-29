import { createContext, useState } from "react";

export const DrawerContext = createContext(null)

export const DrawerProvider = ({ children }) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const [drawerData, setDrawerData] = useState({})

    const value = {
        showDrawer,
        setShowDrawer,
        drawerData,
        setDrawerData,
    }

    return (
        <DrawerContext.Provider value={value}>
            {children}
        </DrawerContext.Provider>
    )
}