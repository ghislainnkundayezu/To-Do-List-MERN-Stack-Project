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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatisticsSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// This is the schema or structure of a document in the users collection.
exports.UserStatisticsSchema = new mongoose_1.Schema({
    ongoing: {
        type: Number,
        required: true,
        default: 0,
    },
    completed: {
        type: Number,
        required: true,
        default: 0,
    },
    deleted: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
});
// This is the schema or structure of a document in the users collection.
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Tasks' }],
    statistics: {
        type: exports.UserStatisticsSchema,
        default: {
            ongoing: 0,
            completed: 0,
            deleted: 0,
            total: 0,
        },
    },
});
// model the users collection based on the UserSchema.
const User = mongoose_1.default.model('Users', UserSchema);
exports.default = User;
