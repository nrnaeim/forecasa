import type { QueryFilter } from "mongoose"
import type { Payment } from "./payment.schema.js"
import { paymentRepository } from "./payment.repository.js"
import type { AuthUser } from "../../services/token.services.js"
import { ServerError } from "../../middleware/error.handler.middleware.js"


//?==================================================================================
//? Payment Services
//?==================================================================================
export class PaymentServices {
    static async create(data: Payment) {
        const newPaymet = await paymentRepository.createOne(data)
        if (!newPaymet) ServerError.throwError("Payment creation failed", 500)
        return newPaymet
    }

    static async getAll(user: AuthUser) {
        const query: QueryFilter<Payment> = user.role === "user" ? { userId: user.id } : {}
        const payments = await paymentRepository.find(query)
        return payments
    }

    static async getSingle(id: string, user: AuthUser) {
        const payment = await paymentRepository.findById(id)
        if (!payment) ServerError.throwError("Invalid Payment ID", 400)
        if (payment?.userId.toString() === user.id) ServerError.throwError("Unauthorized", 403)
        return payment
    }

    static async updateSingle(id: string, data: Partial<Payment>) {
        const updatedPaymet = await paymentRepository.updateById(id, data)
        if (!updatedPaymet) ServerError.throwError("Invalid payment ID", 400)
        return updatedPaymet
    }

    static async deleteSingle(id: string) {
        const deletedPaymet = await paymentRepository.deleteById(id)
        if (!deletedPaymet) ServerError.throwError("Invalid payment ID", 400)
        return deletedPaymet
    }
}