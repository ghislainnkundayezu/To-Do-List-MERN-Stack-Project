import { FC, useContext, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { SearchBar } from './components/SearchBar'
import { ActivityPageLink } from './components/ActivityPageLink'
import { ToggleThemeButton } from './components/ToggleThemeButton'
import { ThemeContext } from '../../App'
import { AddTaskButton } from './components/AddTaskButton'
import { AddTaskDialog } from './components/AddTaskDialog'
import { Task } from './components/Task';

interface TaskData {
    id: string;
    content: string;
}

type TaskList = TaskData[];
export const DashboardPage: FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [taskList, updateTaskList] = useState<TaskList>([]);

    const {themeValue} = useContext(ThemeContext)!;
    
    const page = useRef<HTMLDivElement>(null);
    const previousTheme = useRef<string | null>(null);
    

    useEffect(() => {

    }, [taskList]);

    
    useEffect(() => {
        if (previousTheme.current) {
            page.current?.classList.remove(previousTheme.current);
        }

       page.current!.classList.add(themeValue);
       previousTheme.current = themeValue;
       
    }, [themeValue])

    const openDialog = () => {
        setIsDialogOpen(true);
      };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const addTask = (taskContent: string | undefined): void => {
        
        if (taskContent) { 
            const newId: string = uuidv4();
            const newTask: TaskData = {
                id: newId,
                content: taskContent,
            }
            const newTaskList = taskList;
            newTaskList.push(newTask);

            updateTaskList(newTaskList);
            closeDialog();
        }
        
    };

    const deleteTask = (taskId: string): void => {
        const newTaskList = taskList.filter(task => task.id !== taskId);
        updateTaskList(newTaskList);
    }

    return(
        <div ref={page} className='page' id='dashboard-page'>
            
            <div className='header'>
                <SearchBar />
                <ActivityPageLink />
                <ToggleThemeButton />
            </div>

            <div className='body'>
                {
                    taskList.length !== 0 ? 
                    taskList.map((task) => {
                        return(
                           
                            <Task taskId={task.id} content={task.content} deleteTask={deleteTask}/>
                        );
                    })
                    
                    : <div id='no-tasks'> You have no tasks</div> 
                }

                <AddTaskDialog  isOpen={isDialogOpen} onClose={closeDialog} addTask={addTask}  />                
                <AddTaskButton showAddTaskDailogBox={openDialog}/>
            </div>
        </div>
    )
}