import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";


export const PrivateRoute: FC = () => {
    const location = useLocation();
    const {userIsAuthorized, isLoading, isError} = useAuth(location.pathname);

    if (isLoading ) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <Navigate to={"/authentication/login"} />;
    }

    return(
      userIsAuthorized ? <Outlet /> : <Navigate to={"/authentication/login"} />
    );
}