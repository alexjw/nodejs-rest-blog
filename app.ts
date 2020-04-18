import express, {NextFunction, Request, Response} from 'express'
import feedRoutes from "./src/routes/feedRoutes";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import * as path from "path";
import {MyError} from "./src/utils";

const app = express();

const CONNECTION_URL = 'mongodb+srv://user:nF6ouPL9lcB8jZ5x@freecodecamp-w89rl.gcp.mongodb.net/node-schwarzmuller-course-blog?retryWrites=true&w=majority';

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

// Error handling
app.use((error: MyError, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(error.status).json({message: error.message});
});

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(8080))
    .catch(e => console.log(e));
