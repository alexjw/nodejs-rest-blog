import express from 'express'
import * as feedController from '../controllers/feedController'

const feedRoutes = express.Router();

// /feed
feedRoutes.get('/posts', feedController.postsGet);
feedRoutes.post('/post', feedController.createPostPost);

export default feedRoutes;
