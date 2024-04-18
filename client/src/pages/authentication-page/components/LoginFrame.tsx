import { FC } from "react";
import { InputField } from "./InputField";
import { FormSubmitButton } from "./FormSubmitButton";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../../utils/AuthenticationService";
import { useMessage } from "../../../customHooks/useMessage";


interface LoginFormValues {
    name: string;
    email: string;
    password: string;
}



/**
 * Represents a Login Form component enabling user to Login into the app.
 * @returns {JSX.Element} - The returned component.
 */
export const LoginFrame: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { showMessage } = useMessage()!;
    
    

    const LoginDataSchema = yup.object().shape({
        name: yup
                .string()
                .required('a name is required'),

        email: yup
                .string()
                .email('Enter a valid Email')
                .required('Email field is required'),

        password: yup
                    .string()
                    .min(8)
                    .max(24)
                    .required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(LoginDataSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            
            const response = await AuthenticationService.login(
                data.name,
                data.email,
                data.password,
            );
           
            if (response.success) {
                showMessage("Welcome", "success");
                
                console.log("navigate")
                navigate("/dashboard", { replace: true });
            
            }else {
                throw new Error(response.data.message);
            }
            
        }catch(error: any) {
            
            showMessage(error.message, "error");

        }
    };

    const onError: SubmitErrorHandler<LoginFormValues> = (errors) => {
        Object.values(errors).forEach((error) => {
           
            showMessage(error.message!, "error");
            
        })
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit, onError)} className='input-form'>
            <InputField 
                type="text"
                placeholder="Enter your name..."
                name="name"
                register={register}
                errors={errors}
            />
            
            <InputField 
                type="email"
                placeholder="Enter your email..."
                name="email"
                register={register}
                errors={errors}
            />
            

            <InputField 
                type="password" 
                placeholder="Enter your password..."
                name="password"
                register={register}
                errors={errors}
            />
            
             
            <FormSubmitButton value="Login" name="login" />

        </form>
        
        </>
    );
}