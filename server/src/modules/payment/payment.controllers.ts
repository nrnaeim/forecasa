import type { RequestHandler } from "express"
import type { Payment } from "./payment.schema.js"
import { PaymentServices } from "./payment.services.js"


//?==================================================================================
//? Payment Controllers
//?==================================================================================
export class PaymentControllers {
    static create: RequestHandler = async (req, res, next) => {
        const newPaymet = await PaymentServices.create(req.body)
        res.status(201).json({
            success: true,
            message: "Payment create successful",
            data: newPaymet
        } as JsonRes)
    }

    static getAll: RequestHandler = async (req, res, next) => {
        const payents = await PaymentServices.getAll(req.user)
        res.status(200).json({
            success: true,
            message: "Payments fetch successful",
            data: payents
        } as JsonRes)
    }

    static getSingle: RequestHandler<{ id: string }> = async (req, res, next) => {
        const payment = await PaymentServices.getSingle(req.params.id, req.user)
        res.status(200).json({
            success: true,
            message: "Payment fetch successful",
            data: payment
        } as JsonRes)
    }

    static updateSingle: RequestHandler<{ id: string }, {}, Payment> = async (req, res, next) => {
        const updatedPayment = await PaymentServices.updateSingle(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Payment update successful",
            data: updatedPayment
        } as JsonRes)
    }

    static deleteSingle: RequestHandler<{ id: string }> = async (req, res, next) => {
        const deletedPayment = await PaymentServices.deleteSingle(req.params.id)
        res.status(200).json({
            success: true,
            message: "Payment delete successful",
            data: deletedPayment
        } as JsonRes)
    }

}
