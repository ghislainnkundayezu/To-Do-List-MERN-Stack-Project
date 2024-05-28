import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const api = axios.create({
  baseURL:  "http://192.168.1.76:3000/api/v1/",
  withCredentials: true,
});

export const useAuth = (route: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [location.pathname],
    queryFn:  async () => {
        // Perform the data fetching
        const response = await api.get(`/protected${route}`);
        
        return response.data;
        
      }
  });

  let userIsAuthorized = false;
  if (isSuccess){  
    userIsAuthorized = data && data.success;

  }
  return { userIsAuthorized, isLoading, isError };
};
