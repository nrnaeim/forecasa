import ms from "ms";
import type { CorsOptions } from "cors";
import type { CookieOptions } from "express";
import { env } from "../constant/env.constant.js";

//?==================================================================================
//? Configuration
//?==================================================================================
export class Config {
    //*==== Cors ========================================================
    static cors: CorsOptions = {
        origin: env.ALLOWED_ORIGIN,
        credentials: true,
        maxAge: ms("1d")
    }

    //*==== Cookie ========================================================
    static cookie: CookieOptions = {
        httpOnly: true,
        secure: env.NODE_ENV === "prod",
        maxAge: env.NODE_ENV === "prod" ? ms("15d") : ms("30d")
    }
}