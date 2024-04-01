import { FC, useContext, useEffect } from "react";
import { ActiveFormContext } from "../AuthenticationPage";


interface TogglePageButtonProp {
    value: string;
    dataFormValue: string;
    
    
}

export const TogglePageButton: FC<TogglePageButtonProp> = (props) => {
    const { activeForm, changeActiveForm } = useContext(ActiveFormContext)!;
   

    useEffect(()=> {

    }, [activeForm])

    function clickHandler  (event: React.MouseEvent<HTMLButtonElement>)  {

    }

    return(
        <button 
            className="is-active" 
            data-value-form={props.dataFormValue}
            onClick={clickHandler}
            >{props.value}</button>
    );
}