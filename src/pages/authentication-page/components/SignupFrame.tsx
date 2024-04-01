import { FC } from "react";
import { InputField } from "./InputField";

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
            
            <InputField type="submit" />
        </form>
    );
}