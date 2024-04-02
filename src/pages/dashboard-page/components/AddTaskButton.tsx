import { Icon } from "@iconify/react";
import { FC } from "react";

export const AddTaskButton: FC = () => {
    return(
        <button 
            id="add-task-btn">
            <Icon icon={"ph:plus"} />
        </button>
    );
}