import mongoose, { Schema, Document, Types} from 'mongoose';
//import db from '../db';

interface UserStatisticsSchemaTypes extends Document {
    ongoing: number;
    completed: number;
    deleted: number;
    total: number;
}

export const UserStatisticsSchema = new Schema<UserStatisticsSchemaTypes>({
    ongoing: { 
        type: Number, 
        required: true,
        default: 0, 
    },
    completed: { 
        type: Number, 
        required: true,
        default: 0, 
    },
    deleted: { 
        type: Number, 
        required: true,
        default: 0, 
    },
    total: { 
        type: Number, 
        required: true,
        default: 0, 
    },
});



interface UserSchemaProps extends Document {
    name: string;
    email: string;
    password: string;
    tasks: Types.ObjectId[];
    statistics: {
        ongoing: number;
        completed: number;
        deleted: number;
        total: number;
    };
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

    tasks: [{type: Schema.Types.ObjectId, ref: 'Tasks'}],

    statistics: { 
        type: UserStatisticsSchema, 
        default:  {
            ongoing: 0,
            completed: 0,
            deleted: 0,
            total: 0,
        },
    },
});

const User = mongoose.model<UserSchemaProps>('Users', UserSchema);

export default User;