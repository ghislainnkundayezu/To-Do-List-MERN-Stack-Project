import { FC } from "react";
import { InputField } from "./InputField";
import { FormSubmitButton } from "./FormSubmitButton";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../../utils/AuthenticationService";
import { useMessage } from "../../../customHooks/useMessage";


interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignupFrame: FC = (): JSX.Element => {
    const { showMessage } = useMessage()!;
    
    const navigate = useNavigate();

    const SignUpDataSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(24).required(),
        confirmPassword: yup
                            .string()
                            .oneOf([yup.ref("password")], 'passwords must match')
                            .required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
        resolver: yupResolver(SignUpDataSchema),
    });

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            
            const response = await AuthenticationService.register(
                data.name,
                data.email,
                data.password,
            );

            showMessage('Form submitted successfully!');

            if (response.success) {
                navigate("/dashboard", { replace: true });
            }else {
                throw new Error(response.data.message);
            }
            
        }catch(error: any) {
            showMessage(error.message);
        }
    }

    
    const onError: SubmitErrorHandler<SignUpFormValues> = (errors) => {

        Object.values(errors).forEach((error) => {
            showMessage(error.message!)
            

        });
    };
    

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
            
            <InputField 
                type="password" 
                placeholder="Confirm password..."
                name="confirmPassword"
                register={register}
                errors={errors}
            />
            
            <FormSubmitButton value="Signup" name="signup" />
            
        </form>

        
        </>
    );
}
