import { FC } from "react";

interface InputFieldProps {
    type: string;
    placeholder?: string;

}

export const InputField: FC<InputFieldProps> = (props) => {
    return(
            <input 
                className="input"
                type={props.type} 
                placeholder={props.placeholder}  
            />
    );
}