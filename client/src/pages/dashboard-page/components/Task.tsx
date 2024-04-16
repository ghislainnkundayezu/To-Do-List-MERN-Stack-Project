import { FC, useEffect, useRef, useState } from "react";

interface TaskProps {
    taskId: string;
    content: string;
    status: string;
    deleteTask: (taskId: string) => void;
    updateTaskStatus: (taskId: string, prevStatus: string) => void;
    updateTaskContent: (taskId: string, newTextContent: string) => void;
}
export const Task: FC<TaskProps> = ({ taskId, content, status, deleteTask, updateTaskStatus, updateTaskContent }) => {
    const [ isEditable, updateEditableStatus] = useState(false);
    const [ isChecked, setIsChecked ] = useState(false);
    const editableText = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (status==="completed") {
            setIsChecked(true);
        }else {
            setIsChecked(false);
        }
    }, [status])

    const toggleEditTaskContent = (): void => {
        (isEditable) ? 
        updateEditableStatus(false) : updateEditableStatus(true);
    }

    const handleBlur = (taskId: string): void => {
        const newText = editableText.current?.textContent;
        updateEditableStatus(false);

        if (newText){
            updateTaskContent(
                taskId, 
                newText
            );
        }
    }
    
    return(
        //TODO: remember to update the checkbox status and the style of a task box when the status changes
        <div key={taskId} data-task-status={status} className="task">
            
            <input 
                className="task-check" 
                type="checkbox" 
                checked={isChecked}
                onChange={() => updateTaskStatus(taskId, status)} />

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