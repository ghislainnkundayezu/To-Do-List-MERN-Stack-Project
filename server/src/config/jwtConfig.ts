import jwt from "jsonwebtoken";

interface Payload {
    userId: string;
}

export const generateToken = (payload: Payload): string => {
    return jwt.sign(payload, "salts34568394", {'expiresIn': '30m'})
}

export const verifyToken = (token: string): Payload | null => {
    try {
        const decoded = jwt.verify(token, "salts34568394") as Payload;
        return decoded;
      } catch (err) {
        // Handle token verification error
        console.error('Error verifying token:');
        return null;
      }
}