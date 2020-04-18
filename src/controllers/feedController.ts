import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import Post from "../models/post";
import {MyError} from "../utils";

interface postForm {
    title: string,
    content: string
}

export const postsGet = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({posts: [{_id: '1', title: 'Post', content: 'content', imageUrl: 'public/images/thunderball.jpg', createdAt: new Date(), creator: { name: 'Alex'  }}]});
};

export const createPostPost = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        throw new MyError('Validation failed, entered data is incorrect', 422);
    const requestBody = req.body as postForm;
    const post = new Post({ title: requestBody.title, content: requestBody.content, creator: { name: 'Alex' }});
    post.save().then(result => {
        return res.status(201)
            .json(
                {message: 'Post created Successfully',
                    post: result
                })
    }).catch((e: MyError) => next(e));
};
