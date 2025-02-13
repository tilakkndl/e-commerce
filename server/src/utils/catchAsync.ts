
import { NextFunction, Request, Response, RequestHandler } from "express";

export const  catchAsync =  (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};

