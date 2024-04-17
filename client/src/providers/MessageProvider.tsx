import { FC, ReactNode, createContext, useState } from "react";
import { ToastContainer, Slide } from "react-toastify";

interface MessageContectType {
    message: string | null;
    setMessage: (errorMessage: string|null) => void;
}

export const MessageContext = createContext<MessageContectType | null>(null);

export const MessageProvider: FC<{children: ReactNode}> = ({ children }) => {

    const [ message, setMessage ] = useState<string|null>("");
    
    
    return(
        <MessageContext.Provider value={{message, setMessage}}>
            {children}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </MessageContext.Provider>
    );

};
