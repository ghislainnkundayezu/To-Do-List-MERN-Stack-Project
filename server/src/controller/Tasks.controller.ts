import { Request, Response } from "express";
import Task from "../model/Tasks.model";
import User from "../model/Users.model";
import { MongooseError } from "mongoose";


interface CustomMongooseError extends MongooseError {
    statusCode?: number;
    errorCode?: number | string;
    // Add any other custom properties you might need
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { content, status } = req.body;

        const user = await User.findById(userId);

        if(!user) {
            throw new Error("User doesn't exist")
        }

        const task = await Task.create({
            content,
            status,
            owner: userId
        });
       
        user.tasks.push(task._id);
        user.statistics.ongoing += 1;
        user.statistics.total += 1;
        user.save();
        
        
        res.json({ success: true, message: "task created successfuly", data: task })
    }catch(error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to create a task",
            error: error.message,
        });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try{
        const taskId = req.query.taskId;
        
        if (!taskId) {
            throw new Error("taskId is not Provided");
        }

        const deletedTask = await Task.deleteOne({ _id: taskId });
        
        if (deletedTask.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }


        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })

    }catch(error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to delete a task",
            error: error.message,
        });
    }

}


export const updateTaskContent = async (req: Request, res: Response) => {
    try {
        const { taskId, newContent } = req.body;

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

        res.status(200).json({
            success: true,
            message: "Task content updated successfully",
            newTask: task,        
        });

    }catch(error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }
}

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const { taskId, newStatus } = req.body;
        console.log(taskId, newStatus)
        type StatusType = "ongoing" | "completed";

        if (!(newStatus === "ongoing" || newStatus === "completed")) {
            throw new Error("Task status can only be ongoing or completed")
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

        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            newTask: task,        
        });

    }catch(error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to update the task's status",
            error: error.message,
        });
    }
}

