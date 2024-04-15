import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { ActivityPageLink } from './components/ActivityPageLink'
import { ToggleThemeButton } from './components/ToggleThemeButton'
import { ThemeContext } from '../../App'
import { AddTaskButton } from './components/AddTaskButton'
import { AddTaskDialog } from './components/AddTaskDialog'
import { Task } from './components/Task';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeTaskContent, changeTaskStatus, createTask, fetchUserData, removeTask } from '../../utils/DataFetchingService';


interface TaskData {
    _id: string;
    content: string;
    status: string;
}

type TaskList = TaskData[];

export const DashboardPage: FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [taskList, setTaskList] = useState<TaskList>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const page = useRef<HTMLDivElement>(null);
    const previousTheme = useRef<string | null>(null);

    const {themeValue} = useContext(ThemeContext)!;

    useEffect(() => {
        if (previousTheme.current) {
            page.current?.classList.remove(previousTheme.current);
        }

       page.current!.classList.add(themeValue);
       previousTheme.current = themeValue;

       
       
    }, [themeValue, taskList]);

    const { data, isSuccess } = useQuery({
        queryKey: ["userData"],
        queryFn: fetchUserData
    });

    
    const filteredTaskList = useMemo(() =>{
        return  taskList.filter(task => {
                    return task.content.toLowerCase().includes(searchQuery.toLowerCase());
                });
    }, [taskList, searchQuery]);
    

    const fetchedTasks = useMemo(() => {
        if(isSuccess) {
            return data.data.tasks
        }

        return [];

    }, [data, isSuccess])

    useEffect(()=> {
        if(isSuccess) {
            setTaskList(fetchedTasks);
        }
    }, [fetchedTasks, isSuccess])

    const queryClient = useQueryClient();

    const createTaskMutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            // Optionally, you can invalidate or update queries here
            queryClient.invalidateQueries({queryKey: ['userData']});
          },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: removeTask,
        onSuccess: () => {
            // Optionally, you can invalidate or update queries here
            queryClient.invalidateQueries({queryKey: ['userData']});
          },
    });;

    const taskContentMutation = useMutation({
        mutationFn: changeTaskContent,
        onSuccess: () => {
            // Optionally, you can invalidate or update queries here
            queryClient.invalidateQueries({queryKey: ['userData']});
          },
    });;

    const taskStatusMutation = useMutation({
        mutationFn: changeTaskStatus,
        onSuccess: () => {
            // Optionally, you can invalidate or update queries here
            queryClient.invalidateQueries({queryKey: ['userData']});
          },
    });;

    
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
            //const newId: string = uuidv4();
            const newTask = {
                content: taskContent,
                status: "ongoing",
            }
            //const newTaskList = [...taskList, newTask];
            //setTaskList(newTaskList);
            //closeDialog();

            createTaskMutation.mutateAsync(newTask);

            closeDialog();
        }
        
    };

    const deleteTask = (taskId: string): void => {
        //const newTaskList: TaskList = taskList.filter(task => task._id !== taskId);
        //setTaskList(newTaskList);
        deleteTaskMutation.mutateAsync(taskId);
    }

    const updateTaskContent = (taskId: string, newTextContent: string): void => {
        // const newTaskList: TaskList = taskList.map(task => {
        //     if (task._id === taskId) {
        //         return { ...task, content: newTextContent! }; }
        //     return task;
        // });

        // setTaskList(newTaskList);
        const newTaskContent = {
            "taskId": taskId,
            "newContent": newTextContent,
        };

        taskContentMutation.mutateAsync(newTaskContent);

    }

    const updateTaskStatus = (taskId: string, prevStatus: string): void => {
        
        // const newTaskList = taskList.map((task) => {
        //     if(task._id === taskId) {
        //        return {...task, status: (task.status==="ongoing") ? "complete" : "ongoing"}
        //     }

        //     return task;
        // });
        // setTaskList(newTaskList);
        // console.log(taskList)

        const newTaskContent = {
            "taskId": taskId,
            "newStatus": (prevStatus==="ongoing") ? "completed" : "ongoing",
        };
        console.log(newTaskContent)
        taskStatusMutation.mutateAsync(newTaskContent);
    }

    return(
        <>
        <Helmet>
            <title>Task | Dashboard</title>
        </Helmet>
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
                                key={task._id}
                                taskId={task._id} 
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
        </>
    );
}