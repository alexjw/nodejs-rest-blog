import express from 'express'
import * as authController from '../controllers/authController'
import {body} from "express-validator";
import User from "../models/user";

const authRoutes = express.Router();

const validations = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, body) =>
            User.findOne({email: value})
                .then(doc => doc ? Promise.reject('email already exists') : null)
        ),
    body('password')
        .trim()
        .isLength({min:5}),
    body('name')
        .trim()
        .not()
        .notEmpty()
];

authRoutes.put('/signup', validations, authController.signUp);
authRoutes.post('/login', authController.loginPost);

export default authRoutes;
