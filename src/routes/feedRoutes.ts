import express from 'express'
import * as feedController from '../controllers/feedController'
import {body} from "express-validator";

const feedRoutes = express.Router();

// /feed
feedRoutes.get('/posts', feedController.postsGet);
feedRoutes.post('/post',[
        body('title').trim().isLength({min:5}),
        body('content').trim().isLength({min:5})
    ],
    feedController.createPostPost);
feedRoutes.get('/post/:id', feedController.postGet);

export default feedRoutes;
