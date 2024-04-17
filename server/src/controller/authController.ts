import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../model/Users.model";
import { generateToken } from "../config/jwtConfig";

/**
 * It creates a new user in the system.
 * @param req {Request} - contains data of the request to the server.
 * @param res {Res} - contains data of the response back to the client.
 * @returns { Promise<Response> } - returns an asynchronous response in form of JSON data.
 */

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const { name, email, password } = req.body;
        if(!name || !email|| !password) {
            return res.status(400).json({success: false, message: "Incomplete data"})
        }
        const emailExists = await User.findOne({ email });

        if(emailExists) {
            return res.status(400).json({ success: false, message: "Email exists." })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        console.log(newUser);
        const token = generateToken({ userId: newUser._id });

        res.cookie('authtoken', token, {
			httpOnly: true, 
			maxAge: 300000, 
			sameSite: 'none',
			secure: true,
		});
        
        return res.status(200).json({ success: true, message:token });

    }catch(error: any) {
        return res.status(401).json({
            success: false, 
            message: "Failed to create a new user"
        });
    }
}

/**
 * It receives credentials of a user and check if the user exists in the system.
 * @param req {Request} - contains data of the request to the server.
 * @param res {Res} - contains data of the response back to the client.
 * @returns { Promise<Response> } - returns an asynchronous response in form of JSON data.
 */

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email|| !password) {
            return res.status(400).json({success: false, message: "Incomplete data"})
        }
		
        const [userByName, userByEmail] = await Promise.all([
            User.findOne({ name }),
            User.findOne({ email })
        ]);

        const user = userByName && userByEmail;

        if (!user) {
            return res.status(400).json({success: false, message: "user doesn't exist"});
        }

        const passwordExists = await bcrypt.compare(password, user.password);

        if (!passwordExists) {
            return res.status(400).json({success: false, message: "wrong password"});
        }

        const token = generateToken({ userId: user._id });
        
        res.cookie('authtoken', token, {
            httpOnly: true, 
            maxAge: 3000000,
			sameSite: 'none',
			secure: true,

        });

        return res.status(200).json({success: true, message: token });
    }catch(error) {
        return res.status(401).json({
            success: false, 
            message: "Error in signing in User" 
        });
    }
}

/**
 * It Logs the user out of the system.
 * @param req {Request} - contains data of the request to the server.
 * @param res {Res} - contains data of the response back to the client.
 * @returns { Promise<Response> } - returns an asynchronous response in form of JSON data.
 */

export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        res.clearCookie("authtoken");
        console.log("User Logged out successfully")
        return res.status(200).json({success: true, message: "User Successfully Logged out" });

    }catch(error) {
        return res.status(401).json({
            success: false, 
            message: "Failed to logout user." 
        });
    }
}