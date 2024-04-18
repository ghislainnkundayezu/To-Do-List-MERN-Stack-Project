import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PuffLoader } from 'react-spinners'

import { SearchBar } from './components/SearchBar'
import { ActivityPageLink } from './components/ActivityPageLink'
import { ToggleThemeButton } from './components/ToggleThemeButton'
import { AddTaskButton } from './components/AddTaskButton'
import { AddTaskDialog } from './components/AddTaskDialog'
import { Task } from './components/Task';
import { changeTaskContent, changeTaskStatus, createTask, fetchUserData, removeTask } from '../../utils/DataFetchingService';
import useThemeClass from '../../customHooks/useThemeClass'


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
    
    useThemeClass(page);

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["userData"],
        queryFn: fetchUserData,
        retry: 0,
    });

    if (isLoading) {
        <div id="loading-animation-container">
                <PuffLoader color="#36d7b7" loading={isLoading} size={100} />
        </div>
    }
    
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
            // 
            queryClient.invalidateQueries({queryKey: ['userData']});
          },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: removeTask,
        onSuccess: () => {
            // 
            queryClient.invalidateQueries({queryKey: ['userData']});
          },
    });;

    const taskContentMutation = useMutation({
        mutationFn: changeTaskContent,
        onSuccess: () => {
            // 
            queryClient.invalidateQueries({queryKey: ['userData']});
          },
    });;

    const taskStatusMutation = useMutation({
        mutationFn: changeTaskStatus,
        onSuccess: () => {
            
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
            const newTask = {
                content: taskContent,
                status: "ongoing",
            }
            
            createTaskMutation.mutateAsync(newTask);

            closeDialog();
        }
        
    };

    const deleteTask = (taskId: string): void => {
        deleteTaskMutation.mutateAsync(taskId);
    }

    const updateTaskContent = (taskId: string, newTextContent: string): void => {
        const newTaskContent = {
            "taskId": taskId,
            "newContent": newTextContent,
        };

        taskContentMutation.mutateAsync(newTaskContent);

    }

    const updateTaskStatus = (taskId: string, prevStatus: string): void => {
        const newTaskContent = {
            "taskId": taskId,
            "newStatus": (prevStatus==="ongoing") ? "completed" : "ongoing",
        };
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