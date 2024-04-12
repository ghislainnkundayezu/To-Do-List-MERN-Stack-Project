import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export const PrivateRoute: FC = () => {
    const location = useLocation();

    const { data, isLoading, isError } = useQuery({
        queryKey: [location.pathname],
        queryFn:  async () => {
            // Perform the data fetching
            const response = await axios.get(
              `http://localhost:5000/api/v1/protected${location.pathname}`,
              {
                withCredentials: true,
              }
            );
            return response.data;
          }
    });

    const userAuthorized = data?.success;  ;
    if (isLoading ) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <Navigate to={"/authentication/login"} />;
    }

    return(
       userAuthorized ? <Outlet /> : <Navigate to={"/authentication/login"} />
    );
}