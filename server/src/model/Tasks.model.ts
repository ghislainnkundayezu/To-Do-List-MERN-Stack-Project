import mongoose, { Schema, Document, Types} from 'mongoose';
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

    owner: [{type: Schema.Types.ObjectId, ref: "User"}]


});

const Task = mongoose.model<TaskDataSchemaProps>('Task', TaskSchema);

export default Task;