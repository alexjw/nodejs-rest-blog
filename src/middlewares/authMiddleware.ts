import * as jsonWebToken from 'jsonwebtoken'
import {NextFunction, Request, Response} from "express";
import {MyError, MyRequest} from "../utils";

export const isAuthenticated = (req: MyRequest, res: Response, next: NextFunction) => {
    if(!req.get('Authorization'))
        throw new MyError('Cannot find token', 401);
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken: Object;
    try {
        decodedToken = jsonWebToken.verify(token, 'verygreatsecret');
    } catch (e) {
        throw new MyError('Error decoding the token', 500);
    }
    if(!decodedToken)
        throw new MyError('Not authenticated', 401);
    req.userId = decodedToken['userId'];
    next();
};

