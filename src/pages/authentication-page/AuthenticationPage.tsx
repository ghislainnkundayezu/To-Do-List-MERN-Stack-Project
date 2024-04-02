import { FC, useState, createContext } from 'react'
import { TogglePageButtons } from './components/TogglePageButtons';
import { LoginFrame } from './components/LoginFrame';
import { SignupFrame } from './components/SignupFrame';

interface ActiveFormContextType {
    activeForm: string;
    changeActiveForm: (newValue: string) => void;
}

export const ActiveFormContext = createContext<ActiveFormContextType | null>(null);


export const AuthenticationPage: FC = () => {
    const [activeForm, changeActiveForm] = useState<string>("signup");

    return(
        <ActiveFormContext.Provider value={{activeForm, changeActiveForm}}>
            <div className='page' id='authentication-page'>
            <div className='container'>
                
                <TogglePageButtons />

                { (activeForm==="login") ? <LoginFrame /> : <SignupFrame /> }
                
            </div>
        
            </div>
        
        </ActiveFormContext.Provider>
        
    )
}