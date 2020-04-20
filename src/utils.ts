import * as path from "path";

export class MyError extends Error{
    constructor(message: string, public status?: number) {
        super(message);
        if(!status)
            this.status = 500;
    }
}

export const MAIN_PATH = path.join(__dirname, '../', '../');
