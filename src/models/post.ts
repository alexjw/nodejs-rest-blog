import mongoose, {Document, Schema} from 'mongoose'

export interface PostInterface extends Document {
    password: string;
    email: string;
}

export interface PostInput {
    password: PostInterface['password'];
    email: PostInterface['email'];
}

const postSchema = new Schema(
    {
        title: {
            type:String,
            required: true
        },
        imageUrl: {
            type:String,
            required: true
        },
        content: {
            type:String,
            required: true
        },
        creator: {
            type:Object,
            required: true
        }
    }, { timestamps: true }
);

const Post = mongoose.model<PostInterface>('Post', postSchema);

export default Post;
