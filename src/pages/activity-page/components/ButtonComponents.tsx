import { FC } from "react";
import { Link } from "react-router-dom";
interface ButtonComponentsProps {
    logout: () => void;
}

export const ButtonComponent: FC<ButtonComponentsProps> = ({logout}) => {
    return(
        <div id="button-frame">
            <Link to={"/dashboard"} id="dashboard-link">Dashboard</Link>
            <button onClick={logout}>
                Logout
            </button>
        </div>
        
    );
}