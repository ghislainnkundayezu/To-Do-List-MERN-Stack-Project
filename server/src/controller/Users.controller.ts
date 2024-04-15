import User, { UserSchemaProps } from "../model/Users.model";
import { Request, Response } from "express";

export const getUserData = async (req: Request, res: Response) => {
    
    try {
        const userId = req.user?.userId;
        const data = await User.where("_id").equals(userId).populate("tasks")  //find({_id: userId}).populate('tasks')//.exec();
        if (data.length===0) {
            throw new Error("User not found");
        }
        const { password, ...userDataWithoutPassword } = data[0].toObject();
        res.status(200).json({success: true, data: userDataWithoutPassword});
    
    }catch(error: any) {
        res.status(400).json({
            success: false, 
            message: "User Not Found",
            error: error.message
    });
    
    }
}

