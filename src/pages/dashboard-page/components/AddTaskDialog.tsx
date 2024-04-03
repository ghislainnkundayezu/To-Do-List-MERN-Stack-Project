import { FC, useRef } from "react";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    addTask: (taskContent: string | undefined) => void;
  }

export const AddTaskDialog: FC<DialogProps> = ({isOpen, onClose, addTask}) => {
    const taskContentText = useRef<HTMLInputElement>(null);    
        
    
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
                                autoComplete="off" />

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




// interface AddTaskDialogProps {
//     // Define props here if needed
// }
// interface DialogMethods {
//     open: () => Promise<boolean>;
//     close: () => Promise<boolean>;
// }
// export const AddTaskDialog: FC<AddTaskDialogProps> = forwardRef<HTMLDialogElement, AddTaskDialogProps>((props, ref) => {
//     const dialogBox = useRef<HTMLDialogElement>(null);

//     useImperativeHandle(ref as RefObject<DialogMethods>, () => ({
//         open: async () => {
//             dialogBox.current?.showModal();
//             return true;
//         },
       
//         close: async () => {
//             dialogBox.current?.close();
//             return true;
//         }
//     }));

//     function closeDialog(): void {
//         dialogBox.current?.close();
        
//     }

//     function addTask(): void {
//         closeDialog();
//     }

//     return (
//         <dialog ref={dialogBox} open>
//             <h1 id="dialog-title">Add Task</h1>
//             <div id="dialog-body">
//                 <input type="text" placeholder="Add a new task here..." />
//                 <div id="dialog-control-buttons">
//                     <button onClick={closeDialog} id="cancel-button">Cancel</button>
//                     <button onClick={addTask} id="add-button">Add</button>
//                 </div>
//             </div>
//         </dialog>
//     );
// });
