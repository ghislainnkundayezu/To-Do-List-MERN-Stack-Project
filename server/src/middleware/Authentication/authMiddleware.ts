import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
interface DecodedToken {
    userId: string;
}

declare module 'express' {
    interface Request {
        user?: DecodedToken; // Optional because it may not always be present
    }
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers["authorization"]);
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(400).json({ success: false, message: "Access denied"});
    }

    try {
        const decode = jwt.verify(token, "salts34568394") as DecodedToken;
        req.user = decode;
        console.log("authenticated")
        next();

    }catch(error) {
        return res.status(400).json({ success: false, message: "Access denied"});
    }
}

export default authMiddleware;