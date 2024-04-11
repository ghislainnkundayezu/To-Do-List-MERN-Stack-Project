import axios from "axios";


const AuthenticationService = {
    
    login: async (name:string, email: string, password: string) => {
        
        const response = await axios.post(`
            http://localhost:5000/api/v1/auth/login
        `, {
            name,
            email,
            password,
        });
        return response.data;
    },

    register: async (name:string, email: string, password: string) => {
        
        const response = await axios.post(`
            http://localhost:5000/api/v1/auth/register
        `, {
            name,
            email,
            password,
        });

        return response.data;
    }, 
};

export default AuthenticationService;