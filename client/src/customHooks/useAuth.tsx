import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = (route: string) => {
  const [userAuthenticationStatus, setUserAuthenticationStatus] = useState<boolean|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(`http://localhost:5000/api/v1/protected${route}`)
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/protected${route}`, {
          withCredentials: true,
        });
        console.log(response.data)
        if(response.data.success) {
            setUserAuthenticationStatus(true);
            setIsLoading(false);
        }
        
        //console.log(userAuthenticationStatus, " iyanyayo3333")
      } catch (error) {
        
        setUserAuthenticationStatus(false);
        //console.log(userAuthenticationStatus, " iyanyayo4444")
      }
      
      //console.log(userAuthenticationStatus, " iyanyayo222")
    };

    fetchData();
    //console.log(userAuthenticationStatus, " iyanyayo")
    // Clean up any pending requests when the component unmounts
    return () => {
      // Cancel any pending requests or perform any necessary cleanup
    };
  }, [route]);
  
  return { userAuthenticationStatus, isLoading };
};
