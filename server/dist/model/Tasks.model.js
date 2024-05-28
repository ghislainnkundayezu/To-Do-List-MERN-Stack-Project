"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const Users_model_1 = __importDefault(require("./Users.model"));
// This is the schema or structure of a document in the tasks collection.
const TaskSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    owner: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Users" }]
});
// Middleware that gets executed before deleting a document in the tasks collection.
TaskSchema.pre('deleteOne', { query: true, document: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = yield Task.findById(this.getQuery()._id);
        const taskId = task === null || task === void 0 ? void 0 : task._id;
        try {
            const user = yield Users_model_1.default.findOneAndUpdate({ tasks: taskId }, {
                $pull: { tasks: taskId },
                $inc: {
                    "statistics.deleted": 1,
                    [`statistics.${task === null || task === void 0 ? void 0 : task.status}`]: -1
                }
            });
            if (!user) {
                throw new Error("Failed to delete task");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
// model the tasks collection based on the TaskSchema.
const Task = mongoose_1.default.model('Tasks', TaskSchema);
exports.default = Task;
