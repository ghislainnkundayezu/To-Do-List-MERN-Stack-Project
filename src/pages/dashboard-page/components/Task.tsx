import { FC } from "react";

interface TaskProps {
    taskId: string;
    content: string;
    deleteTask: (taskId: string) => void;
}
export const Task: FC<TaskProps> = ({ taskId, content, deleteTask }) => {
    return(
        <div key={taskId} className="task">
            
            <input className="task-check" type="checkbox" name="" id="" />
            <span id="taskContent">{content}</span>
            <button id="edit-task-button">Edit</button>
            <button id="delete-task-button" onClick={() => { deleteTask(taskId) }}>Delete</button>
        </div>
    );
}