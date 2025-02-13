import {Request, Response, NextFunction} from 'express';
import { AppError } from '@utils/appError';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const  errorMiddleware = (err: AppError, _req: Request, res:Response, _next: NextFunction) => {
    err.message = err.message || 'Something went wrong';
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err,
    });
};


export default  errorMiddleware;