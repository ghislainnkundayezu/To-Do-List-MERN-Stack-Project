import { FC } from 'react'
import { ToggleFormButtons } from './components/ToggleFormButtons';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet'


export const AuthenticationPage: FC = () => {
    
    return(
        <>
        <Helmet>
            <title>Task | Authentication</title>
        </Helmet>
        <div className='page' id='authentication-page'>
                <div className='container'>
                    
                    <ToggleFormButtons />
                    
                    <Outlet />                   

                </div>
        </div>
        </>
        
    )
}
