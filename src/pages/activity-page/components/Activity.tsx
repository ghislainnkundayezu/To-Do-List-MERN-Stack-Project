import { FC } from "react";

interface ActivityProps {
    activityLabel: string;
}

export const Activity: FC<ActivityProps> = ({activityLabel}) => {
    return(
        <div id="activity">
            <h4>{activityLabel}</h4>
            <span>10</span>
        </div>
    );
}