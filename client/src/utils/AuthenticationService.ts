import axios from "axios";

const requestOptions = {
    withCredentials: true,
}
const AuthenticationService = {
    
    login: async (name:string, email: string, password: string) => {
        
        try {
            const response = await axios.post(`
            http://localhost:5000/api/v1/auth/login
            `, {
                name,
                email,
                password,
            }, requestOptions);
            return response.data;
        }catch(error: any) {
            console.log(error)
            if (error.code==="ERR_NETWORK") {
                throw new Error(error.message);
                
            }else if (error.code==="ERR_BAD_REQUEST") {
                throw new Error(error.response.data.message);
            }
           
        }
    },

    register: async (name:string, email: string, password: string) => {
        
        const response = await axios.post(`
            http://localhost:5000/api/v1/auth/register
        `, {
            name,
            email,
            password,
        }, requestOptions);

        return response.data;
    }, 

    logout: async () => {
        await axios.post(`http://localhost:5000/api/v1/auth/logout`, 
                null, requestOptions);
    }
};

export default AuthenticationService;