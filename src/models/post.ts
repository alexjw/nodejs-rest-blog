import mongoose, {Document, Schema} from 'mongoose'

export interface PostInterface extends Document {
    title: string;
    imageUrl: string;
    content: string;
    creator: Object;
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
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, { timestamps: true }
);

const Post = mongoose.model<PostInterface>('Post', postSchema);

export default Post;
