import { FC } from "react";
import { Link } from "react-router-dom";



// Defines the type of parameter the ButtonComponent receives.
interface ButtonComponentsProps {
    logout: () => void;   // it logs out the user from his/her account.
}

/**
 * A component which hold the Logout and Back to Dashboard buttons.
 * @param {ButtonComponentsProps} props - Name of the activity. 
 * @returns {JSX.Element} - The returned component.
 */

export const ButtonComponent: FC<ButtonComponentsProps> = ({logout}: ButtonComponentsProps): JSX.Element => {
    return(
        <div id="button-frame">
            <Link to={"/dashboard"} id="dashboard-link">Dashboard</Link>
            <button onClick={logout}>
                Logout
            </button>
        </div>
        
    );
}