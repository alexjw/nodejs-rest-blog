import {Request, Response, NextFunction} from "express";

interface postForm {
    title: string,
    content: string
}

export const postsGet = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({posts: [{title: 'Post', content: 'content'}]});
};

export const createPostPost = (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body as postForm;
    res.status(201)
        .json(
            {message: 'Post created Successfully',
                post: { id: new Date().toISOString(), title: requestBody.title, content: requestBody.content}
            })
};
