import User from "../model/Users.model";
import { Request, Response } from "express";

/**
 * 
 * @param req {Request} - Object containing data of the Request to the server. 
 * @param res {Response} - Object containing data of the Response to the client.
 */
export const getUserData = async (req: Request, res: Response): Promise<Response> => {
    
    try {

        // get the userId passed on to the Request object by the Authentication middleware.
        const userId = req.user?.userId;

        // get all of the data associated to the user with that specific Id.
        const data = await User.where("_id").equals(userId).populate("tasks")  //find({_id: userId}).populate('tasks')//.exec();
        
        // if there is not data throw an error to the user.
        if (data.length===0) {
            throw new Error("User not found");
        }

        // if the data exists destructure the password of the user from the data and return the rest of the data.
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

