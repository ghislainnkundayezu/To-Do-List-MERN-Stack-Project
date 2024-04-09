import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface FormSubmitButtonProps {
    name: string;
    value: string;
}

export const FormSubmitButton: FC<FormSubmitButtonProps> = (props) => {
    const navigate = useNavigate();

    function clickHandler(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        //event.preventDefault();
        //navigate("/dashboard");
        
    }
    
    return(
        <input 
            className="form-submit-button" 
            type="submit" 
            value={props.value}
            name={props.name}
            onClick={clickHandler}/>
    );
}