import { Request, Response } from "express";
import Task from "../model/Tasks.model";
import User from "../model/Users.model";


/**
 * This function creates a new task associated to a specific user in the database.
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation. 
 */
export const createTask = async (req: Request, res: Response): Promise<Response> => {
    try {

        // get userId attribute from the Request object.
        const userId = req.user?.userId;

        // get the content and the status of the new task in the body of the Request object.
        const { content, status } = req.body;

        // search for the user with the userId sent in the request.
        const user = await User.findById(userId);

        // if the user isnot found throw an error.
        if(!user) {
            throw new Error("User doesn't exist")
        }

        // create a new task document in the database with content and status attributes 
        //and the owner attrribute with an Id referencing the userId in the Request object.
        const task = await Task.create({
            content,
            status,
            owner: userId
        });
        
        // update the tasks and statistics attributes of the User document. 
        user.tasks.push(task._id);
        user.statistics.ongoing += 1;
        user.statistics.total += 1;
        user.save();
        
        // return a success message.
        return res.status(201).json({ success: true, message: "task created successfuly", data: task });

    }catch(error: any) {
        // if the the process fails return an error message to the client.
        return res.status(400).json({
            success: false,
            message: "Failed to create a task",
            error: error.message,
        });
    }
};


/**
 * This function deletes a Task associated to a specific user from the database .
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation. 
 */
export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try{
        // get the taskId from the query parameter of Request.
        const taskId = req.query.taskId;
        
        // If there is no taskId throw an error. 
        if (!taskId) {
            throw new Error("taskId is not Provided");
        }

        // find a task document with the given taskId in the database and delete it.
        const deletedTask = await Task.deleteOne({ _id: taskId });
        
        // If no task is found return an error message to the client.
        if (deletedTask.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // if the task is successfully deleted return a success message to the client.
        return res.status(200).json({
            success: true,
            message: "Task Deleted"
        });


    }catch(error: any) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete a task",
            error: error.message,
        });
    }

}

/**
 * This function updates the content attribute of the task document with a given Id.
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation. 
 */
export const updateTaskContent = async (req: Request, res: Response): Promise<Response> => {
    try {

        // get taskId and the newContet attributes from the body attribute of the Request object.
        const { taskId, newContent } = req.body;
        
        // if the neither the taskId nor the newContent attributes doesn't exist throw an error.
        if (!taskId || !newContent) {
            throw new Error("Task Id or newContent not Provided");
        }


        const task = await Task.findById(taskId);
        const taskOwner = task && Array.isArray(task.owner) && task.owner[0];
       
        if(taskOwner.toString() !== req.user?.userId) {
            throw new Error("You are not allowed to update this task");
        }

        if (!task) {
            throw new Error("Task Not Found");
        }
        
        task.content = newContent;
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task content updated successfully",
            newTask: task,        
        });

    }catch(error: any) {
        return res.status(400).json({
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }
}

/**
 * 
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation. 
 */
export const updateTaskStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { taskId, newStatus } = req.body;
        console.log(taskId, newStatus)
        type StatusType = "ongoing" | "completed";

        if (!(newStatus === "ongoing" || newStatus === "completed")) {
            throw new Error("Task status can only be labeled by ongoing or completed")
        }

        const userId = req.user?.userId;

        if (!taskId || !newStatus) {
            throw new Error("Task Id or newStatus not Provided");
        }


        const task = await Task.findById(taskId);

        const taskOwner = task && Array.isArray(task.owner) && task.owner[0];

        if(taskOwner.toString() !== userId) {
            throw new Error("You are not allowed to update this task");
        }

        if (!task) {
            throw new Error("Task Not Found");
        }
        
        if(task.status===newStatus) {
            throw new Error("Task Status already exists");
        }

        

        const user = await User.findById(userId);
        
        if (user) {
            if (newStatus==="ongoing") {
                user.statistics.completed -= 1;                
                user.statistics.ongoing += 1;
                user.save();
             
            }else {
                user.statistics.ongoing -= 1;
                user.statistics.completed += 1;
                user.save();
            }
        }else {
            throw new Error("User Doesn't exist");
        }
        task.status = newStatus;
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            newTask: task,        
        });

    }catch(error: any) {
        return res.status(400).json({
            success: false,
            message: "Failed to update the task's status",
            error: error.message,
        });
    }
}

