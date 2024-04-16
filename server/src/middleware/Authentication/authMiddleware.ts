import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../../config/jwtConfig';
interface DecodedToken {
    userId: string;
}

declare module 'express' {
    interface Request {
        user?: DecodedToken; 
    }
}


/**
 * 
 * @param req {Request} - contains data of the request to the server. 
 * @param res {Response} - contains data of the response to the client.
 * @param next {NextFunction} - 
 * @returns 
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authtoken;
    
    //const authheader = req.headers["authorization"];
    //const token = authheader && authheader.split(' ')[1];
    
    if(!token) {
        return res.status(403).json({ success: false, message: "Access denied"});
    }

    try {
        const decode = verifyToken(token) as DecodedToken; 
        
        if(!decode.userId) throw new Error("Invalid Token");
        
        req.user = decode;
        
        next();

    }catch(error: any) {
        return res.status(403).json({ success: false, message: "Access denied"});
    }
}

export default authMiddleware;