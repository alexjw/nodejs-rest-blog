import express, {NextFunction, Request, Response} from 'express'
import feedRoutes from "./src/routes/feedRoutes";
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import * as path from "path";
import {MyError} from "./src/utils";
import multer from "multer";
import Path from "path";
import authRoutes from "./src/routes/authRoutes";

const app = express();

const fileStorage = multer.diskStorage(
    {
        destination: (req, file, callback) => {
            callback(null, 'public/images');
        },
        filename: (req, file, callback) => {
            callback(null, new Date().toISOString().replace(/:/g, '.') + '-' + file.originalname);
        }
    }
);

const fileFilter = (req, file, callback) => {
    if(file.mimeType === 'image/png' || file.mimeType === 'image/jpg' || file.mimeType === 'image/jpeg')
        callback(null, true);
    else
        callback(null, false);
};

const CONNECTION_URL = 'mongodb+srv://user:nF6ouPL9lcB8jZ5x@freecodecamp-w89rl.gcp.mongodb.net/node-schwarzmuller-course-blog?retryWrites=true&w=majority';

//app.use(express.static(Path.join(__dirname, "../", 'public')));    // Routing the public folder to grant access css to html

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single('image'));
console.log(__dirname);

app.use('/public/images', express.static(Path.join(__dirname, "../", 'public', 'images')));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

// Error handling
app.use((error: MyError, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    res.status(error.status).json({message: error.message, errors: error.errors});
});

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(8080))
    .catch(e => console.log(e));
