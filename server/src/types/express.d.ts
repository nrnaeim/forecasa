import { Express } from "express";
import type { User } from "../modules/user/user.type.ts";
import type { AuthUser } from "../services/token.services.ts";


declare global {
    interface JsonRes {
        success: boolean,
        message: string,
        data?: any,
        error?: any
    }
    namespace Express {
        interface Request {
            user: AuthUser
        }
    }
}