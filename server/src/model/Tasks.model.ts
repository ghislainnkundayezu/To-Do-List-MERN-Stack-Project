import mongoose, { Schema, Document, Types} from 'mongoose';
import User from './Users.model';

// Defines the type the properties of a document in the tasks collection.
interface TaskDataSchemaProps extends Document {
    content: string;
    status: string;
    owner: Types.ObjectId;
}

// This is the schema or structure of a document in the tasks collection.
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

// Middleware that gets executed before deleting a document in the tasks collection.
TaskSchema.pre('deleteOne', {query:true, document: false}, async function(next) {
    
    const task = await Task.findById(this.getQuery()._id);
    const taskId = task?._id;
    
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


// model the tasks collection based on the TaskSchema.
const Task = mongoose.model<TaskDataSchemaProps>('Tasks', TaskSchema);      



export default Task;