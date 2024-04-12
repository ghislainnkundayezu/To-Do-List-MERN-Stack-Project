import { Router, Request, Response } from "express";
import authMiddleware from "../middleware/Authentication/authMiddleware";

const router = Router();

router.get("/dashboard", authMiddleware, async (req: Request, res: Response)=>{
    res.json({success: true, userId: req.user});
    console.log("success")
});

router.get("/activity", authMiddleware, async (req: Request, res: Response)=>{
    res.json({success: true, userId: req.user});
    console.log("success")
});



router.get("/dashboard/user/tasks", authMiddleware, async (req: Request, res: Response)=>{
    res.json({success: true, userId: req.user});
    console.log("success")
});

router.get("/dashboard/user/tasks", authMiddleware, async (req: Request, res: Response)=>{
    res.json({success: true, userId: req.user});
    console.log("success")
});

router.get("/activity/user", authMiddleware, async (req: Request, res: Response)=>{
    res.json({success: true, userId: req.user});
    console.log("success")
})

export default router;