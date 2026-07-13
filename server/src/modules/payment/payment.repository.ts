import type { Model } from "mongoose";
import { PaymentModel } from "./payment.model.js";
import type { Payment } from "./payment.schema.js";
import { BaseRepository } from "../../repository/base.repository.js";

//?==================================================================================
//? Payment Repository
//?==================================================================================
export class PaymentRepository<T> extends BaseRepository<T> {
    constructor(model: Model<T>) {
        super(model)
    }
}


export const paymentRepository = new PaymentRepository<Payment>(PaymentModel)