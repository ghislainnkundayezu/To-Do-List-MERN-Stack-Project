import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/authController";
import authMiddleware from "../middleware/Authentication/authMiddleware";

const router = Router();    // Router object  

router.post('/register', registerUser);     // route to Register a user into the system.

router.post("/login", loginUser)       // route to Login a user into the system.

router.post("/logout", authMiddleware, logoutUser)      // route to Logout a user into the system.

export default router;