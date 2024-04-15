import mongoose, { Schema, Document, Types} from 'mongoose';
import User from './Users.model';

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


TaskSchema.pre('deleteOne', {query:true, document: false}, async function(next) {
    const task = await Task.findById(this.getQuery()._id);
    const taskId = task?._id;
    console.log(task?.owner);
    try   {
        const user = await User.findOneAndUpdate(
            { tasks: taskId },

            { 
                $pull: { tasks: taskId },
                $inc: { 
                        "statistics.deleted": 1,
                        [`statistics.${task?.status}`]: -1 
                }
            }
        );

        if (!user) {
            
            throw new Error("Failed to delete task");
            
        }

        next();
        
    }catch(error: any) {
        next(error);
    }
});

const Task = mongoose.model<TaskDataSchemaProps>('Tasks', TaskSchema);



export default Task;