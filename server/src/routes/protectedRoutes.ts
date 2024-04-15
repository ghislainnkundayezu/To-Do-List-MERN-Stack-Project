import { Router, Request, Response, NextFunction } from "express";
import authMiddleware from "../middleware/Authentication/authMiddleware";
import { getUserData } from "../controller/Users.controller";
import { createTask, deleteTask, updateTaskContent, updateTaskStatus } from "../controller/Tasks.controller";

const router = Router();

router.get("/dashboard", async (req: Request, res: Response) => {
    res.json({
        success: true, 
        message: "User is authorized"
    });
});

router.get("/activity", async (req: Request, res: Response) => {
    res.json({
        success: true, 
        message: "User is authorized"
    });
});


router.get("/user", getUserData);

router.post("/user/create-task", createTask);

router.patch("/user/update-task-content", updateTaskContent);

router.patch("/user/update-task-status", updateTaskStatus);

router.delete("/user/delete-task", deleteTask);


export default router;