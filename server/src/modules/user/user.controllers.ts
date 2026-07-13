import type { RequestHandler } from "express";
import { UserServices } from "./user.services.js";
import { id } from "zod/locales";


//?==================================================================================
//? User Controllers
//?==================================================================================
export class UserControllers {
    //*==== Add ========================================================
    static add: RequestHandler = async (req, res, next) => {
        const newUser = await UserServices.add(req.body)
        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: newUser
        } as JsonRes)
    }

    //*==== Get Users ========================================================
    static getAll: RequestHandler = async (req, res, next) => {
        const users = await UserServices.getAll()
        res.status(200).json({
            success: true,
            message: "Users fetch successful",
            data: users
        } as JsonRes)

    }

    //*==== Get Users ========================================================
    static getSingle: RequestHandler<{ id: string }> = async (req, res, next) => {
        const user = await UserServices.getSingle(req.params.id)
        res.status(200).json({
            success: true,
            message: "User fetch successful",
            data: user
        } as JsonRes)
    }

    //*==== Update ========================================================
    static update: RequestHandler<{ id: string }> = async (req, res, next) => {
        const updatedUser = await UserServices.update(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "User update successful",
            data: updatedUser
        } as JsonRes)

    }

    //*==== Get Users ========================================================
    static delete: RequestHandler<{ id: string }> = async (req, res, next) => {
        const deletedUser = await UserServices.remove(req.params.id)
        res.status(200).json({
            success: true,
            message: "User delete successful",
            data: deletedUser
        } as JsonRes)
    }
}