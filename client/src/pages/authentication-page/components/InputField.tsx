import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
    type: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    errors?: Record<string, any>;
}

export const InputField: FC<InputFieldProps> = (props) => {

    let hasError =  false;
    
    if (Object.keys(props.errors!).includes(props.name)) {
        hasError = true;
    }
    

    return(
            <input 
                className="input"
                type={props.type} 
                placeholder={props.placeholder}  
                autoComplete="off"
                { ...props.register(props.name) }
                style={{
                    border: hasError ? "1px solid red" : "",
                  }}
            />
    );
}


