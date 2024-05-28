"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // configure the dotenv to be able to read environment variables.
/**
 * This function accepts a payload containing userInfo and uses cryptographic algorithms to generate a Token.
 * @param payload - It holds the data about a specific user.
 * @returns string - The token generated from the combination of the payload and the secret key to generate a signature.
 */
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, { 'expiresIn': '30m' }); // a function which signs the token and returns the token string.
};
exports.generateToken = generateToken;
/**
 * This functions verifies if the token was signed using the same secret key that the server has.
 * @param token - The token string containing the
 * @returns Payload | null - return a payload containing user information or an error when none is found.
 */
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET); // it recalculates the signature based on the secret key.
        return decoded;
    }
    catch (error) {
        // Handle token verification error
        console.error('Error verifying token:');
        throw new Error(error);
    }
};
exports.verifyToken = verifyToken;
