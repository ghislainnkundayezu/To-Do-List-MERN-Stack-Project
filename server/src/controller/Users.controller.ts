import User, { UserSchemaProps } from "../model/Users.model";
import { Request, Response } from "express";

/**
 * 
 * @param req {Request} - Object containing data of the Request to the server. 
 * @param res {Response} - Object containing data of the Response to the client.
 */
export const getUserData = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        const userId = req.user?.userId;
        const data = await User.where("_id").equals(userId).populate("tasks")  //find({_id: userId}).populate('tasks')//.exec();
        if (data.length===0) {
            throw new Error("User not found");
        }
        const { password, ...userDataWithoutPassword } = data[0].toObject();
        return res.status(200).json({success: true, data: userDataWithoutPassword});
    
    }catch(error: any) {
        return res.status(404).json({
            success: false, 
            message: "User Not Found",
            error: error.message
    });
    
    }
}

