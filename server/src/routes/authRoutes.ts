import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/authController";
import authMiddleware from "../middleware/Authentication/authMiddleware";

const router = Router();

router.post('/register', registerUser);

router.post("/login", loginUser)

router.post("/logout", authMiddleware, logoutUser)

export default router;