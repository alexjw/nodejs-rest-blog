import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {MyError} from "../utils";
import bcrypt from 'bcryptjs'
import User, {UserInterface} from "../models/user";
import * as jsonWebToken from 'jsonwebtoken'

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

export const loginPost = (req: Request, res: Response, next: NextFunction) => {
    const signUpBody = req.body as signUpBodyInterface;
    let loadedUser: UserInterface;
    User.findOne({email: signUpBody.email})
        .then(user => {
            if(!user)
                throw new MyError('Could not find the user', 401);
            loadedUser = user;
            console.log(signUpBody.password);
            console.log(user.password);
            return bcrypt.compare(signUpBody.password, user.password)
        })
        .then(equal => {
            if(!equal)
                throw new MyError('Wrong password', 401);
            const token = jsonWebToken.sign({ email: loadedUser.email, userId: loadedUser._id.toString() }, 'verygreatsecret', { expiresIn: '1h' });
            res.status(200).json({ token, userId: loadedUser._id.toString()})
        })
        .catch((e: MyError) => next(e));
};
