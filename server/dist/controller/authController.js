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
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_model_1 = __importDefault(require("../model/Users.model"));
const jwtConfig_1 = require("../config/jwtConfig");
const cookieOptions = {
    httpOnly: true,
    maxAge: 30000000,
};
/**
 * It creates a new user in the system.
 * @param req {Request} - contains data of the request to the server.
 * @param res {Res} - contains data of the response back to the client.
 * @returns { Promise<Response> } - returns an asynchronous response in form of JSON data.
 */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the username, email, and password from the body of the Request object.
        const { name, email, password } = req.body;
        // check if all of the data exists or else return an error.
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Incomplete data" });
        }
        // search if the email provided already exists in the database.
        const emailExists = yield Users_model_1.default.findOne({ email });
        // check if the email taken by and return an error to the client. 
        if (emailExists) {
            return res.status(400).json({ success: false, message: "Email exists." });
        }
        // genarate a hashed password.
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // create a record of the new user in the database.
        const newUser = new Users_model_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        // generate a token using the userId and return it to the user as a cookie. 
        const token = (0, jwtConfig_1.generateToken)({ userId: newUser._id });
        res.cookie('authtoken', token, cookieOptions);
        return res.status(200).json({ success: true, message: token });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to create a new user"
        });
    }
});
exports.registerUser = registerUser;
/**
 * It receives credentials of a user and check if the user exists in the system.
 * @param req {Request} - contains data of the request to the server.
 * @param res {Res} - contains data of the response back to the client.
 * @returns { Promise<Response> } - returns an asynchronous response in form of JSON data.
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the username, email, and password from the body of the Request object.
        const { name, email, password } = req.body;
        // check if all of the data exists or else return an error.
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Incomplete data" });
        }
        // search in the database for the name and email from the client. 
        const [userByName, userByEmail] = yield Promise.all([
            Users_model_1.default.findOne({ name }),
            Users_model_1.default.findOne({ email })
        ]);
        // if the username is not null the user email is assigned the variable.
        const user = userByName && userByEmail;
        // if the user variable doesn't exist return an error to the client.
        if (!user) {
            return res.status(400).json({ success: false, message: "user doesn't exist" });
        }
        // if the user exists compare the given password with one stored in the user document.
        const passwordExists = yield bcrypt_1.default.compare(password, user.password);
        // if the password doesn't exist return an error.
        if (!passwordExists) {
            return res.status(400).json({ success: false, message: "wrong password" });
        }
        // generate a token using the userId and return it to the user as a cookie.
        const token = (0, jwtConfig_1.generateToken)({ userId: user._id });
        res.cookie('authtoken', token, cookieOptions);
        return res.status(200).json({ success: true, message: token });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error in signing in User"
        });
    }
});
exports.loginUser = loginUser;
/**
 * It Logs the user out of the system.
 * @param req {Request} - contains data of the request to the server.
 * @param res {Res} - contains data of the response back to the client.
 * @returns { Promise<Response> } - returns an asynchronous response in form of JSON data.
 */
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // send a response to remove authentication token from the cookie storage of the client.
        res.clearCookie("authtoken");
        return res.status(200).json({ success: true, message: "User Successfully Logged out" });
    }
    catch (error) {
        return res.status(403).json({
            success: false,
            message: "Failed to logout user."
        });
    }
});
exports.logoutUser = logoutUser;
