import { FC, useContext } from "react";
import { ActiveFormContext } from "../AuthenticationPage";


interface TogglePageButtonProp {
    value: string;
    dataFormValue: string;
    className: string;
    
}

export const TogglePageButton: FC<TogglePageButtonProp> = (props) => {
    const { changeActiveForm } = useContext(ActiveFormContext)!;
   
    function clickHandler  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)  {
        const target = event.target as HTMLElement;
        const attribute: string = target.getAttribute("data-value-form")!;
        changeActiveForm(attribute);
        
    }

    return(
        <button 
            className={props.className} 
            data-value-form={props.dataFormValue}
            onClick={clickHandler}
            >{props.value}</button>
    );
}