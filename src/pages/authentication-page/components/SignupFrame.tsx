import { FC } from "react";
import { InputField } from "./InputField";
import { FormSubmitButton } from "./FormSubmitButton";

export const SignupFrame: FC = () => {
    return(
        <form action="" className='input-form'>
            <InputField 
                type="email"
                placeholder="Enter your email..."
            />
            
            <InputField
                type="text" 
                placeholder="Enter your password..."
            />
            
            <InputField 
                type="password" 
                placeholder="Confirm password..."
            />
            
            <FormSubmitButton value="Signup" />
            
        </form>
    );
}