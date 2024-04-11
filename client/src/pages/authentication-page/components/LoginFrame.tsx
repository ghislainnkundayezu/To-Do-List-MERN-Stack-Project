import { FC } from "react";
import { InputField } from "./InputField";
import { FormSubmitButton } from "./FormSubmitButton";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthenticationService from "../../../utils/AuthenticationService";

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
                const token: string = response.message;
                toast.success('Form submitted successfully!');
                console.log(response);
                try {
                const responses = await axios.get('http://localhost:5000/api/v1/protected/dashboard', {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                console.log('Data:', responses.data);
                }catch(error) {
                    console.log("errors")
                }
            
            }else {
                toast.error('Error in signing up!');
            }
            
            //toast.error('Error in signing up!');
            //navigate("/dashboard");
        }catch(error) {}
    };

    const onError: SubmitErrorHandler<LoginFormValues> = (errors) => {
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
                transition: Slide
            });
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
            
             
            <FormSubmitButton value="Login" name="login" />

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