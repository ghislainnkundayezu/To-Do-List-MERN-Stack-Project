import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
    type: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
}

export const InputField: FC<InputFieldProps> = (props) => {
    return(
            <input 
                className="input"
                type={props.type} 
                placeholder={props.placeholder}  
                autoComplete="off"
                { ...props.register(props.name) }
            />
    );
}