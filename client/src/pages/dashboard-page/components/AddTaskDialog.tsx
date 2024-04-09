import { FC, useRef } from "react";

// defines the type of paremeters recevied by the Add task dialog component.
interface DialogProps {
    isOpen: boolean;    // indicates whether the component is open or not.
    onClose: () => void;    // closes the component.
    addTask: (taskContent: string | undefined) => void; // add a task created by a user to the list of tasks
  }

/**
 * Represents a dialog component for adding a new task.
 * @param {DialogProps} isOpen - Determines whether the dialog is open.
 * @param {DialogProps} onClose - Callback function to close the dialog.
 * @param {DialogProps} addTask - Callback function to add a new task.
 * @returns {JSX.Element} - The rendered component.
 */

export const AddTaskDialog: FC<DialogProps> = ({isOpen, onClose, addTask}: DialogProps): JSX.Element => {
    const taskContentText = useRef<HTMLInputElement>(null);    
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void  => {
        if (event.key === "Enter") {
            addTask(taskContentText.current?.value);
        }
        
    }
    
    return (
        <>
            {
                isOpen && 
                <>
                    <div className="backdrop" onClick={onClose}></div>
                    <dialog open>     
                        <h3 id="dialog-title">Add Task</h3>
                        <div id="dialog-body">
                            <input
                                ref={taskContentText}  
                                id="task-input" 
                                type="text" 
                                placeholder="Add a new task here..."
                                autoComplete="off"
                                onKeyDown={handleKeyDown} />

                            <div id="dialog-control-buttons">
                                <button onClick={onClose} id="cancel-button">Cancel</button>                
                                <button 
                                    onClick={()=> addTask(taskContentText.current?.value)} 
                                    id="add-task-button">Add</button>
                            </div>
                        </div>
                    </dialog>
                </>
            }
        </>
    );
};




