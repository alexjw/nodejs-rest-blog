import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {MyError} from "../utils";
import bcrypt from 'bcryptjs'
import User from "../models/user";

interface signUpBodyInterface {
    email: string,
    name: string,
    password: string
}

export const signUp = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
        throw new MyError('Validation failed', 422, errors.array());
    const signUpBody = req.body as signUpBodyInterface;
    bcrypt.hash(signUpBody.password, 12)
        .then(hashed => {
            const user = new User({email: signUpBody.email, password: hashed, name: signUpBody.name});
            return user.save();
        })
        .then(user => res.status(201).json({ message: 'User created', id: user._id}))
        .catch((e: MyError) => next(e));
};
