import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../model/Users.model";
import { generateToken } from "../config/jwtConfig";

export const registerUser = async (req: Request, res: Response) => {
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

        const token = generateToken({ userId: newUser._id });

        res.status(200).json({ success: true, message:token });

    }catch(error) {
        console.log("failed to create user!");
        res.status(401).json({success: false, message: "Failed to create a new user"})
    }
}


export const loginUser = async (req: Request, res: Response) => {
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
        
        res.status(200).json({success: true, message: token });
        
    }catch(error) {

    }
}