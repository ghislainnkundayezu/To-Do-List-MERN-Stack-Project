import { FC } from 'react'
import { ToggleFormButtons } from './components/ToggleFormButtons';
import { Outlet } from 'react-router-dom';


export const AuthenticationPage: FC = () => {
    
    return(
        <div className='page' id='authentication-page'>
                <div className='container'>
                    
                    <ToggleFormButtons />
                    
                    <Outlet />                   

                </div>
        </div>
        
        
    )
}
