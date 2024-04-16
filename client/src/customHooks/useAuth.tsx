import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useAuth = (route: string) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [location.pathname],
    queryFn:  async () => {
        // Perform the data fetching
        const response = await axios.get(
          `http://localhost:5000/api/v1/protected${route}`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      }
  });

  let userIsAuthorized = false;
  if (isSuccess){  
    userIsAuthorized = data && data.success;

  }
  return { userIsAuthorized, isLoading, isError };
};
