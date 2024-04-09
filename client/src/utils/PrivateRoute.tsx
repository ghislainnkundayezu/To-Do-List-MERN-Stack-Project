import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute: FC = () => {
    const auth = {
        token: true,
        username: "Ghislain Nkundayezu",
    }

    return(
        auth.token ? <Outlet /> : <Navigate to={"/authentication/login"} />
    );
}