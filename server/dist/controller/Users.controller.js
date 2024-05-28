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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = void 0;
const Users_model_1 = __importDefault(require("../model/Users.model"));
/**
 *
 * @param req {Request} - Object containing data of the Request to the server.
 * @param res {Response} - Object containing data of the Response to the client.
 */
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get the userId passed on to the Request object by the Authentication middleware.
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        // get all of the data associated to the user with that specific Id.
        const data = yield Users_model_1.default.where("_id").equals(userId).populate("tasks"); //find({_id: userId}).populate('tasks')//.exec();
        // if there is not data throw an error to the user.
        if (data.length === 0) {
            throw new Error("User not found");
        }
        // if the data exists destructure the password of the user from the data and return the rest of the data.
        const _b = data[0].toObject(), { password } = _b, userDataWithoutPassword = __rest(_b, ["password"]);
        return res.status(200).json({ success: true, data: userDataWithoutPassword });
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: "User Not Found",
            error: error.message
        });
    }
});
exports.getUserData = getUserData;
