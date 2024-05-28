import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../../config/jwtConfig';

// Represents the type Data in the the Decoded payload of the jwt Token.
interface DecodedToken {
    userId: string;
}

// It adds the data type user as part Request object in the express module.
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
    //const authheader = req.headers["authorization"];
    //const token = authheader && authheader.split(' ')[1];

   const token = req.cookies.authtoken;   // extract the token from the cookies sent in the Request object.
    

    if(!token) {
        return res.status(403).json({ success: false, message: "Access denied"});    // Deny access to the user when he doesn't have a Token.
    }

    try {
        const decode = verifyToken(token) as DecodedToken;   // Get the payload from the Token
        
        if(!decode.userId) throw new Error("Invalid Token");  // If the payload doesn't contain a userId invalidate it.
        
        
        // Add a user attribute to the Request object and pass the Request to the next handler.
        req.user = decode;   
        next();

    }catch(error: any) {
        return res.status(403).json({ success: false, message: "Access denied"});   // If any errors arise deny acces to the user.
    }
}

export default authMiddleware;