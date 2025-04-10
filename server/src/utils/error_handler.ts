import HttpStatusCode from './http-status-code'
import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandler = (error: CustomError | undefined, req: Request, res: Response): void => {
    if (error?.message) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: error.message,
            success: false
        });
    } else {
        if (error) {
            if (!error.statusCode) {
                error.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
            }
        } else {
            // Handle the situation when error is undefined
            // Maybe create a new error object with a default status code
            error = {
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: 'Unknown error'
            } as CustomError;
        }
    }
};
