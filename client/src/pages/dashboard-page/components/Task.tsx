import { FC, useRef, useState } from "react";

interface TaskProps {
    taskId: string;
    content: string;
    status: string;
    deleteTask: (taskId: string) => void;
    updateTaskStatus: (taskId: string) => void;
    updateTaskContent: (taskId: string | null | undefined, newTextContent: string | null | undefined) => void;
}
export const Task: FC<TaskProps> = ({ taskId, content, status, deleteTask, updateTaskStatus, updateTaskContent }) => {
    const [ isEditable, updateEditableStatus] = useState(false);
    const editableText = useRef<HTMLSpanElement>(null);


    const toggleEditTaskContent = (): void => {
        (isEditable) ? 
        updateEditableStatus(false) : updateEditableStatus(true);
    }

    const handleBlur = (taskId: string): void => {
        updateEditableStatus(false);
        updateTaskContent(
            taskId, 
            editableText.current?.textContent
        );
    }
    
    return(
        <div key={taskId} data-task-status={status} className="task">
            
            <input 
                className="task-check" 
                type="checkbox" 
                name="" 
                id=""
                onChange={() => updateTaskStatus(taskId)} />

            <span 
                ref={editableText}
                id="taskContent"
                className={(isEditable) ? "text-editable" : ""}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={() => handleBlur(taskId)}
            >{content}
            
            </span>

            <button 
                id="edit-task-button"
                onClick={toggleEditTaskContent}>
                    {isEditable ? "Save" : "Edit"}
            </button>
            
            <button 
                id="delete-task-button" 
                onClick={() => { deleteTask(taskId) }}>
                    Delete
            </button>

        </div>
    );
}