import axios from "axios";

const api = axios.create({
    baseURL:   `https://your-server-url.onrender.com/api/v1/`,
    withCredentials: true,
});
console.log(process.env.BASE_URL)
console.log(api.getUri())

const AuthenticationService = {
    
    login: async (name:string, email: string, password: string) => {
        
        try {
            const response = await api.post(`/auth/login`, {
                name,
                email,
                password,
            });
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
        
        const response = await api.post(`/auth/register`, {
            name,
            email,
            password,
        });

        return response.data;
    }, 

    logout: async () => {

        await api.post(`/auth/logout`, 
                null);

    }
};

export default AuthenticationService;