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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.updateTaskContent = exports.deleteTask = exports.createTask = void 0;
const Tasks_model_1 = __importDefault(require("../model/Tasks.model"));
const Users_model_1 = __importDefault(require("../model/Users.model"));
/**
 * This function creates a new task associated to a specific user in the database.
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation.
 */
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get userId attribute from the Request object.
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        // get the content and the status of the new task in the body of the Request object.
        const { content, status } = req.body;
        // search for the user with the userId sent in the request.
        const user = yield Users_model_1.default.findById(userId);
        // if the user isnot found throw an error.
        if (!user) {
            throw new Error("User doesn't exist");
        }
        // create a new task document in the database with content and status attributes 
        //and the owner attrribute with an Id referencing the userId in the Request object.
        const task = yield Tasks_model_1.default.create({
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
    }
    catch (error) {
        // if the the process fails return an error message to the client.
        return res.status(400).json({
            success: false,
            message: "Failed to create a task",
            error: error.message,
        });
    }
});
exports.createTask = createTask;
/**
 * This function deletes a Task associated to a specific user from the database .
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation.
 */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the taskId from the query parameter of Request.
        const taskId = req.query.taskId;
        // If there is no taskId throw an error. 
        if (!taskId) {
            throw new Error("taskId is not Provided");
        }
        // find a task document with the given taskId in the database and delete it.
        const deletedTask = yield Tasks_model_1.default.deleteOne({ _id: taskId });
        // If no task is found return an error message to the client.
        if (deletedTask.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        // if the task is successfully deleted return a success message to the client.
        return res.status(200).json({
            success: true,
            message: "Task Deleted"
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete a task",
            error: error.message,
        });
    }
});
exports.deleteTask = deleteTask;
/**
 * This function updates the content attribute of the task document with a given Id.
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation.
 */
const updateTaskContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // get taskId and the newContet attributes from the body attribute of the Request object.
        const { taskId, newContent } = req.body;
        // if the neither the taskId nor the newContent attributes doesn't exist throw an error.
        if (!taskId || !newContent) {
            throw new Error("Task Id or newContent not Provided");
        }
        const task = yield Tasks_model_1.default.findById(taskId);
        const taskOwner = task && Array.isArray(task.owner) && task.owner[0];
        if (taskOwner.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId)) {
            throw new Error("You are not allowed to update this task");
        }
        if (!task) {
            throw new Error("Task Not Found");
        }
        task.content = newContent;
        yield task.save();
        return res.status(200).json({
            success: true,
            message: "Task content updated successfully",
            newTask: task,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to update task",
            error: error.message,
        });
    }
});
exports.updateTaskContent = updateTaskContent;
/**
 *
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 * @returns - a promise of the Response object containing JSON Data which has the status of the operation.
 */
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { taskId, newStatus } = req.body;
        if (!(newStatus === "ongoing" || newStatus === "completed")) {
            throw new Error("Task status can only be labeled by ongoing or completed");
        }
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
        if (!taskId || !newStatus) {
            throw new Error("Task Id or newStatus not Provided");
        }
        const task = yield Tasks_model_1.default.findById(taskId);
        const taskOwner = task && Array.isArray(task.owner) && task.owner[0];
        if (taskOwner.toString() !== userId) {
            throw new Error("You are not allowed to update this task");
        }
        if (!task) {
            throw new Error("Task Not Found");
        }
        if (task.status === newStatus) {
            throw new Error("Task Status already exists");
        }
        const user = yield Users_model_1.default.findById(userId);
        if (user) {
            if (newStatus === "ongoing") {
                user.statistics.completed -= 1;
                user.statistics.ongoing += 1;
                user.save();
            }
            else {
                user.statistics.ongoing -= 1;
                user.statistics.completed += 1;
                user.save();
            }
        }
        else {
            throw new Error("User Doesn't exist");
        }
        task.status = newStatus;
        yield task.save();
        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            newTask: task,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to update the task's status",
            error: error.message,
        });
    }
});
exports.updateTaskStatus = updateTaskStatus;
