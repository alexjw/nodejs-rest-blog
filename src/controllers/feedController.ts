import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import Post from "../models/post";
import {MyError} from "../utils";

interface postForm {
    title: string,
    content: string
}

export const postsGet = (req: Request, res: Response, next: NextFunction) => {
    Post.find()
        .then(posts => res.status(200).json({ posts }))
        .catch(e => next(e));
    //res.status(200).json({posts: [{_id: '1', title: 'Post', content: 'content', imageUrl: 'public/images/thunderball.jpg', createdAt: new Date(), creator: { name: 'Alex'  }}]});
};

export const postGet = (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    Post.findById(id)
        .then(result => {
            if(!result)
                throw new MyError('Could not find the post', 404);
            return res.status(200).json({post: result});
        })
        .catch(e => next(e));
    //res.status(200).json({posts: [{_id: '1', title: 'Post', content: 'content', imageUrl: 'public/images/thunderball.jpg', createdAt: new Date(), creator: { name: 'Alex'  }}]});
};

export const createPostPost = (req, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        throw new MyError('Validation failed, entered data is incorrect', 422);
    if(!req.file)
        throw new MyError('No image provided', 422);
    const imageUrl = req.file.path;
    const requestBody = req.body as postForm;
    const post = new Post({ title: requestBody.title, content: requestBody.content, imageUrl, creator: { name: 'Alex' }});
    post.save().then(result => {
        return res.status(201)
            .json(
                {message: 'Post created Successfully',
                    post: result
                })
    }).catch((e: MyError) => next(e));
};
