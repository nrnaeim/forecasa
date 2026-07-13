import type { RequestHandler } from "express";
import { Config } from "../../config/config.js";
import { AuthServices } from "./auth.services.js";
import type { ForgotPassword } from "./auth.schema.js";

//?==================================================================================
//? Auth Controllers
// //?==================================================================================
export class AuthControllers {
    //*==== Login ========================================================
    static login: RequestHandler = async (req, res, next) => {
        const { r_token, ...user } = await AuthServices.login(req.body)
        res.cookie("r_token", r_token, Config.cookie)
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        } as JsonRes)
    }

    //*==== Me ========================================================
    static me: RequestHandler = async (req, res, next) => {
        const me = await AuthServices.me(req.user.id)
        res.status(200).json({
            success: true,
            message: "Fetch successful",
            data: me
        } as JsonRes)
    }

    //*==== Logout ========================================================
    static logout: RequestHandler = async (req, res, next) => {
        await AuthServices.logout(req.cookies.r_token)
        res.clearCookie("r_token")
        res.status(200).json({
            success: true,
            message: "Logout successful",
        } as JsonRes)
    }


    //*==== Refresh Token ========================================================
    static refresh: RequestHandler = async (req, res, next) => {
        const { r_token } = req.cookies
        const a_token = await AuthServices.refresh(r_token)
        res.status(200).json({
            success: true,
            message: "Token refresh successful",
            data: { a_token }
        } as JsonRes)

    }

    //*==== Update Password ========================================================
    static updatePassword: RequestHandler = async (req, res, next) => {
        await AuthServices.updatePassword(req.user.id, req.body)
        res.status(200).json({
            success: true,
            message: "Password update successful"
        } as JsonRes)
    }

    //*==== Reset Password ========================================================
    static forgotPassword: RequestHandler<{}, {}, ForgotPassword> = async (req, res, next) => {
        await AuthServices.forgotPassword(req.body.email)
        res.status(200).json({
            success: true,
            message: "Password reset link has beend send to your email"
        } as JsonRes)
    }

    //*==== Reset Password ========================================================
    static resetPassword: RequestHandler<{ token: string }> = async (req, res, next) => {
        await AuthServices.resetPassword(req.params.token, req.body.password)
        res.status(200).json({
            success: true,
            message: "Password reset successful"
        } as JsonRes)
    }

}