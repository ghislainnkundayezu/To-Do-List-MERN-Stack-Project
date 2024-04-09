import { FC } from "react";
import { InputField } from "./InputField";
import { FormSubmitButton } from "./FormSubmitButton";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

interface SignUpFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignupFrame: FC = (): JSX.Element => {
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

    const onSubmit = (data: SignUpFormValues) => {
        console.log(data);
        toast.success('Form submitted successfully!');
        navigate("/dashboard");
    }

    
    const onError: SubmitErrorHandler<SignUpFormValues> = (errors) => {

        Object.values(errors).forEach((error) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
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
            />

            <InputField 
                type="email"
                placeholder="Enter your email..."
                name="email"
                register={register}
            />
            
            <InputField
                type="password" 
                placeholder="Enter your password..."
                name="password"
                register={register}

            />
            
            <InputField 
                type="password" 
                placeholder="Confirm password..."
                name="confirmPassword"
                register={register}
            />
            
            <FormSubmitButton value="Signup" name="signup" />
            
        </form>

        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
        />
        </>
    );
}