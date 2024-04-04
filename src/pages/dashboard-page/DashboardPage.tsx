import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react'
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
    status: string;
}

type TaskList = TaskData[];
export const DashboardPage: FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [taskList, setTaskList] = useState<TaskList>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const {themeValue} = useContext(ThemeContext)!;
    
    const page = useRef<HTMLDivElement>(null);
    const previousTheme = useRef<string | null>(null);

    const filteredTaskList = useMemo(() =>{
        return  taskList.filter(task => {
                    return task.content.toLowerCase().includes(searchQuery.toLowerCase());
                });
    }, [taskList, searchQuery]);
    
    useEffect(() => {
        if (previousTheme.current) {
            page.current?.classList.remove(previousTheme.current);
        }

       page.current!.classList.add(themeValue);
       previousTheme.current = themeValue;
       
    }, [themeValue]);


    const updateSearchQuery = (searchQuery: string | undefined): void => {
        setSearchQuery(searchQuery!);
    }

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
                status: "ongoing",
            }
            const newTaskList = [...taskList, newTask];
            setTaskList(newTaskList);
            closeDialog();
        }
        
    };

    const deleteTask = (taskId: string): void => {
        const newTaskList: TaskList = taskList.filter(task => task.id !== taskId);
        setTaskList(newTaskList);
    }

    const updateTaskContent = (taskId: string | null | undefined, newTextContent: string | null | void): void => {
        const newTaskList: TaskList = taskList.map(task => {
            if (task.id === taskId) {
                return { ...task, content: newTextContent! }; }
            return task;
        });
        setTaskList(newTaskList);
        
    }

    const updateTaskStatus = (taskId: string): void => {
        
        const newTaskList = taskList.map((task) => {
            if(task.id === taskId) {
               return {...task, status: (task.status==="ongoing") ? "complete" : "ongoing"}
            }

            return task;
        });
        setTaskList(newTaskList);
        console.log(taskList)
    }

    return(
        <div ref={page} className='page' id='dashboard-page'>
            
            <div className='header'>
                <SearchBar 
                    searchQuery={searchQuery}
                    updateSearchQuery={updateSearchQuery} />
                <ActivityPageLink />
                <ToggleThemeButton />
            </div>

            <div className='body'>
                {
                    (taskList.length !== 0) ? 
                    filteredTaskList.map((task) => {
                        return(
                            <Task 
                                taskId={task.id} 
                                content={task.content} 
                                status={task.status}
                                deleteTask={deleteTask}
                                updateTaskStatus={updateTaskStatus}
                                updateTaskContent={updateTaskContent}
                            />
                        );
                    })
                    
                    : <div id='no-tasks'> You have no tasks</div> 
                }

                <AddTaskDialog  isOpen={isDialogOpen} onClose={closeDialog} addTask={addTask}  />                
                <AddTaskButton showAddTaskDailogBox={openDialog}/>
            </div>
        </div>
    );
}