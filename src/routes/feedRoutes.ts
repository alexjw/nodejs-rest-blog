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
feedRoutes.post('/post', isAuthenticated, validations, feedController.createPostPost);
feedRoutes.get('/post/:id', isAuthenticated, feedController.postGet);
feedRoutes.put('/post/:id', isAuthenticated, validations, feedController.postPut);
feedRoutes.delete('/post/:id', isAuthenticated, feedController.postDelete);

export default feedRoutes;
