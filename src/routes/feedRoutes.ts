import express from 'express'
import * as feedController from '../controllers/feedController'
import {body} from "express-validator";
import {isAuthenticated} from "../middlewares/authMiddleware";

const feedRoutes = express.Router();

const validations = [
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
];

// /feed
feedRoutes.get('/posts', isAuthenticated, feedController.postsGet);
feedRoutes.post('/post', validations, feedController.createPostPost);
feedRoutes.get('/post/:id', feedController.postGet);
feedRoutes.put('/post/:id', validations, feedController.postPut);
feedRoutes.delete('/post/:id', feedController.postDelete);

export default feedRoutes;
