import * as path from "path";
import {NextFunction, Request, Response} from "express";

export class MyError extends Error{
    constructor(message: string, public status?: number, public errors?: any[]) {
        super(message);
        if(!status)
            this.status = 500;
        if(!errors)
            this.errors = [];
    }
}

export const SECRET_TOKEN_KEY = 'verygreatsecret';

export interface MyRequest extends Request {
    userId: string
}

export const MAIN_PATH = path.join(__dirname, '../', '../');
