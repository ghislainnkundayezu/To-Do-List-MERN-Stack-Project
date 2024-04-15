import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../../config/jwtConfig';
import { error } from 'console';
interface DecodedToken {
    userId: string;
}

declare module 'express' {
    interface Request {
        user?: DecodedToken; // Optional because it may not always be present
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authtoken;
    //const authheader = req.headers["authorization"];

    //const token = authheader && authheader.split(' ')[1];
    
    if(!token) {
        return res.status(400).json({ success: false, message: "Access denied"});
    }

    try {
        const decode = verifyToken(token) as DecodedToken; //jwt.verify(token, "salts34568394") as DecodedToken;
        if(!decode.userId) throw new Error("Invalid Token");
        req.user = decode;
        console.log("authenticated");
        next();

    }catch(error) {
        return res.status(400).json({ success: false, message: "Access denied"});
    }
}

export default authMiddleware;