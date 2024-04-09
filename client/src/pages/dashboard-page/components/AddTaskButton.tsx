import { Icon } from "@iconify/react";
import { FC } from "react";

interface AddTaskButtonProps {
    showAddTaskDailogBox: () => void;
}

export const AddTaskButton: FC<AddTaskButtonProps> = (props) => {
    return(
        <button 
            id="display-add-task-dialog"
            onClick={props.showAddTaskDailogBox}>
            <Icon icon={"ph:plus-bold"} />
        </button>
    );
}