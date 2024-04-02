import { FC } from "react";
import { TogglePageButton } from "./TogglePageButton";
import { useContext } from "react";
import { ActiveFormContext } from "../AuthenticationPage";

export const TogglePageButtons: FC = () => {
    const { activeForm } = useContext(ActiveFormContext)!;
    

    return(
        <div className='toggle-page-btn'>
            <TogglePageButton  
                className={activeForm==="signup" ? "is-active-form" : ""} 
                value={"Signup"}
                dataFormValue={"signup"} />
            <TogglePageButton
                className={activeForm==="login" ? "is-active-form" : ""}  
                value={"Login"}
                dataFormValue={"login"} />
        </div>
    );
    
}