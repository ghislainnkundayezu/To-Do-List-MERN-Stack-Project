import { FC } from "react";
import { TogglePageButton } from "./TogglePageButton";
import { useContext } from "react";
import { ActiveFormContext } from "../AuthenticationPage";

export const TogglePageButtons: FC = () => {
    const { activeForm} = useContext(ActiveFormContext)!;

    

    return(
        <div className='toggle-page-btn'>
            <TogglePageButton  
                value={"SignUp"}
                dataFormValue={"signup"} />
            <TogglePageButton  
                value={"LogIn"}
                dataFormValue={"login"} />
        </div>
    );
}