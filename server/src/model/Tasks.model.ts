import mongoose, { Schema, Document, Types} from 'mongoose';
import User from './Users.model';
//import db from '../db';
interface TaskDataSchemaProps extends Document {
    content: string;
    status: string;
    owner: Types.ObjectId;
}


const TaskSchema = new Schema<TaskDataSchemaProps>({
    content: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    owner: [{type: Schema.Types.ObjectId, ref: "Users"}]


});


//TODO: remember to work on this function
TaskSchema.pre("deleteOne", {query: false, document: true}, async function(next) {
    try   {
        const taskId = this.owner;
        console.log("okay");

        //TODO: I want to also update the ongoing or completed statistics of the User.
        const user = await User.findOneAndUpdate(
            { tasks: taskId },

            { 
                $pull: { tasks: taskId },
                $inc: { 
                        "statistics.deleted": 1,
                        [`statistics.${this.status}`]: -1 
                }
            }
        );

        if (!user) {
            
            throw new Error("Failed to delete task");
            
        }

        // if (this.status==="ongoing") {
        //     user.statistics.ongoing -= 1;
        // }else {
        //     user.statistics.completed -= 1;
        // }

        next();
        
    }catch(error: any) {
        next(error);
    }
});

const Task = mongoose.model<TaskDataSchemaProps>('Tasks', TaskSchema);



export default Task;