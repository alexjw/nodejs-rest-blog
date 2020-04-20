import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";
import Post from "../models/post";
import {MAIN_PATH, MyError} from "../utils";
import * as fs from "fs";
import * as path from "path";

interface postForm {
    title: string,
    content: string
}

export const postsGet = (req: Request, res: Response, next: NextFunction) => {
    Post.find()
        .then(posts => res.status(200).json({ posts }))
        .catch(e => next(e));
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
};

export const createPostPost = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        throw new MyError('Validation failed, entered data is incorrect', 422);
    if(!req.file)
        throw new MyError('No image provided', 422);
    const imageUrl = req.file.path.replace(/\\/g, '/');
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

export const postPut = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        throw new MyError('Validation failed, entered data is incorrect', 422);

    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if(req.file)
        imageUrl = req.file.path.replace(/\\/g, '/');
    if(!imageUrl)
        throw new MyError('No file picked', 422);

    Post.findById(id)
        .then(post => {
            if(!post)
                throw new MyError('Could not find post', 404);
            if(imageUrl !== post.imageUrl)
                clearImage(post.imageUrl);
            post.title = title;
            post.imageUrl = imageUrl;
            post.content = content;
            return post.save();
        })
        .then(result => res.status(200).json({ message: 'Post Updated', post: result}))
        .catch((e: MyError) => next(e));
};

export const postDelete = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    Post.findById(id)
        .then(post => {
            if(!post)
                throw new MyError('Could not find post', 404);
            clearImage(post.imageUrl)
            return Post.findByIdAndRemove(id);
        })
        .then(result => res.status(200).json({ message: 'Post Deleted'}))
        .catch((e: MyError) => next(e));
};

const clearImage = (filePath: string) => {
    filePath = path.join(MAIN_PATH, filePath);
    fs.unlink(filePath, err => console.log(err));
};
