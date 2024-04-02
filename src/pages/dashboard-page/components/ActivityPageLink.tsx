import { Icon } from "@iconify/react";
import { FC } from "react";
import { Link } from "react-router-dom";

export const ActivityPageLink: FC = () => {
    return(
        <Link 
            id="activity-page-link"
            to={"/activity"}>
            <Icon icon={"mdi:account-cog-outline"} /> 
        </Link>
    );
}