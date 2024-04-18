import jwt from "jsonwebtoken";
import dotenv  from "dotenv";

dotenv.config();

interface Payload {
    userId: string;
}

export const generateToken = (payload: Payload): string => {
    return jwt.sign(payload, process.env.TOKEN_SECRET!, {'expiresIn': '30m'})
}

export const verifyToken = (token: string): Payload | null => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as Payload;
        return decoded;
      } catch (err) {
        // Handle token verification error
        console.error('Error verifying token:');
        return null;
      }
}