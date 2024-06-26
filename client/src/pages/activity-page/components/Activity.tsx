import { FC } from "react";

// Defines the type of parameters the Activity component receives.
interface ActivityProps {
    activityLabel: string;  // represents the name of the activity.
    value: number;
}

/**
 * A component which represents the statistics about a user's tasks.
 * @param {ActivityProps} props - Name of the activity. 
 * @returns {JSX.Element} - The returned component.
 */

export const Activity: FC<ActivityProps> = ({activityLabel, value}: ActivityProps): JSX.Element => {
    return(
        <div id="activity">
            <h4>{activityLabel}</h4>
            <span>{value}</span>
        </div>
    );
}