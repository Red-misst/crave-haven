"use client"
import { Provider } from "react-redux"
import { store } from "@/utils/store/store";


const StoreWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Provider store={store}>
                {children}
            </Provider>
        </>
    )
}

export default StoreWrapper;