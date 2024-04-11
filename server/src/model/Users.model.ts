import mongoose, { Schema, Document, Types} from 'mongoose';
//import db from '../db';
interface UserSchemaProps extends Document {
    name: string;
    email: string;
    password: string;
    tasks: Types.ObjectId[];
}

const UserSchema = new Schema<UserSchemaProps>({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    tasks: [{type: Schema.Types.ObjectId, ref: 'Tasks'}]
});

const User = mongoose.model<UserSchemaProps>('Users', UserSchema);

export default User;