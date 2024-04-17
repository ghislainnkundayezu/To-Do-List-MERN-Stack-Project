import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { PuffLoader } from "react-spinners";

export const PrivateRoute: FC = () => {
    const location = useLocation();
    const {userIsAuthorized, isLoading, isError} = useAuth(location.pathname);

    if (isLoading ) {
        return(
            <div id="loading-animation-container">
                <PuffLoader color="#36d7b7" loading={isLoading} size={100} />
            </div>
        ); 
    }

    if (isError) {
        
        return <Navigate to={"/authentication/login"} />;
    }

    return(
      userIsAuthorized ? <Outlet /> : <Navigate to={"/authentication/login"} />
    );
}