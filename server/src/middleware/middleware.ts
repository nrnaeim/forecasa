import { safeParse, type core } from "zod"
import type { RequestHandler } from "express"
import type { Role } from "../constant/enum.constants.js"
import { ServerError } from "./error.handler.middleware.js"
import { TokenServices } from "../services/token.services.js"
import { RedisServices } from "../services/redis.services.js"

//?==================================================================================
//? Middlewares
//?==================================================================================
export class Middlewares {
    //*==== Authenticate ========================================================
    static authenticate: RequestHandler = async (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) ServerError.throwError("Invalid token", 400)
        req.user = await TokenServices.verify(token)
        next()
    }

    //*==== Authorize ========================================================
    static authorize(...roles: Role[]): RequestHandler {
        return async (req, res, next) => {
            if (!roles.includes(req.user.role)) ServerError.throwError("Unauthorized", 403)
            next()
        }
    }


    //*==== Validation ========================================================
    static validator(schema: core.$ZodType, target: "body" | "query" | "params" = "body"): RequestHandler {
        return async (req, res, next) => {
            const { success, data, error } = safeParse(schema, req[target])
            if (!success) return next(error)
            req[target] = data
            next()
        }
    }
}