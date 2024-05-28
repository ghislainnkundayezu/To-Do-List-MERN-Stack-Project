"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_controller_1 = require("../controller/Users.controller");
const Tasks_controller_1 = require("../controller/Tasks.controller");
const router = (0, express_1.Router)(); // Router object.
//
router.get("/dashboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        success: true,
        message: "User is authorized"
    });
}));
router.get("/activity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        success: true,
        message: "User is authorized"
    });
}));
router.get("/user", Users_controller_1.getUserData);
router.post("/user/create-task", Tasks_controller_1.createTask);
router.patch("/user/update-task-content", Tasks_controller_1.updateTaskContent);
router.patch("/user/update-task-status", Tasks_controller_1.updateTaskStatus);
router.delete("/user/delete-task", Tasks_controller_1.deleteTask);
exports.default = router;
