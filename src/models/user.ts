import mongoose, {Document, Schema} from 'mongoose'

export interface UserInterface extends Document {
    title: string;
    imageUrl: string;
    content: string;
    creator: Object;
}

const userSchema = new Schema(
    {
        email: {
            type:String,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        name: {
            type:String,
            required: true
        },
        status: {
            type:String,
            default: 'I am new'
        },
        posts: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    }, { timestamps: true }
);

const User = mongoose.model<UserInterface>('User', userSchema);

export default User;
