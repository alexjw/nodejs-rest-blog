import * as path from "path";

export class MyError extends Error{
    constructor(message: string, public status?: number, public errors?: any[]) {
        super(message);
        if(!status)
            this.status = 500;
        if(!errors)
            this.errors = [];
    }
}

export const MAIN_PATH = path.join(__dirname, '../', '../');
