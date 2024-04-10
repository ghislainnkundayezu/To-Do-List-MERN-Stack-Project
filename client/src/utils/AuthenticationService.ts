import axios from "axios";


const AuthenticationService = {
    
    login: async (name:string, email: string, password: string) => {
        
        const response = await axios.post(`
            http://localhost:5000/api/v1/login
        `, {
            name,
            email,
            password,
        });
        return response.data;
    },

    register: async (name:string, email: string, password: string, confirmPassword: string) => {
        
        const response = await axios.post(`
            http://localhost:5000/api/v1/register
        `, {
            name,
            email,
            password,
            confirmPassword,
        });

        return response.data;
    }, 
};

export default AuthenticationService;