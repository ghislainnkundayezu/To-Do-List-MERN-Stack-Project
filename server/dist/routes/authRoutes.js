"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const authMiddleware_1 = __importDefault(require("../middleware/Authentication/authMiddleware"));
const router = (0, express_1.Router)(); // Router object  
router.post('/register', authController_1.registerUser); // route to Register a user into the system.
router.post("/login", authController_1.loginUser); // route to Login a user into the system.
router.post("/logout", authMiddleware_1.default, authController_1.logoutUser); // route to Logout a user into the system.
exports.default = router;
