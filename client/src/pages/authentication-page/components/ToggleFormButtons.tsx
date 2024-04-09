import { FC } from "react";
import { NavLink } from "react-router-dom";

export const ToggleFormButtons: FC = () => {
    
    return(
        <div className='toggle-form-links-container'>
            <NavLink  
                className="toggle-form-link"
                to={"/authentication/signup"}
            >        
                Signup
            </NavLink>

            <NavLink
                className="toggle-form-link"
                to={"/authentication/login"}
            >    
                Login
            </NavLink>
            
        </div>
    );

    
    
}