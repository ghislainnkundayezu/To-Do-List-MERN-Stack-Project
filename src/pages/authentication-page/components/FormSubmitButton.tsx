import { FC } from "react";

interface FormSubmitButtonProps {
    value: string;
}

export const FormSubmitButton: FC<FormSubmitButtonProps> = (props) => {
    
    function clickHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
    }
    
    return(
        <input 
            className="form-submit-button" 
            type="submit" 
            value={props.value}
            onClick={clickHandler}/>
    );
}