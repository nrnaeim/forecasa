import { ZodError } from "zod"
import { mongo } from "mongoose"
import { errors as PasetoError } from "paseto"
import { capitalize } from "../utils/utils.js"
import type { Request, Response, NextFunction } from "express"

//?==================================================================================
//? Server Error Class
//?==================================================================================
export class ServerError extends Error {
    statusCode: number
    reasons: any
    constructor(message: string, statusCode: number, reasons?: any) {
        super(message)
        this.statusCode = statusCode
        this.reasons = reasons
        Error.captureStackTrace(this, this.constructor)
    }
    //*==== Throw Error ========================================================
    static throwError(message: string, statusCode: number, reasons?: any): never {
        throw new ServerError(message, statusCode, reasons)
    }
}

//?==================================================================================
//? Error Handler
//?==================================================================================
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('============= In Error Handler  =============')
    console.log(error)
    console.log('============= In Error Handler  =============')

    let message = "Default message"
    let statusCode = 500
    let reason: any = null

    //*==== Server ========================================================
    if (error instanceof ServerError) {
        message = error.message
        statusCode = error.statusCode
        reason = error.reasons
    }

    //*==== Zod ========================================================
    if (error instanceof ZodError) {
        reason = error.issues.map(e => e.message)
    }
    //*==== DB ========================================================
    if (error instanceof mongo.MongoServerError) {
        if (error.code === 11000) {
            message = "Failed to create"
            statusCode = 400
            reason = Object.keys(error.keyValue).map(key => `${capitalize(key)} already exist`)
        }

    }

    //*==== Paseto ========================================================
    if (error instanceof PasetoError.PasetoError) {
        message = "Invalid token"
        statusCode = 401
    }

    res.status(statusCode).json({ success: false, message: message, error: reason } as JsonRes)
}