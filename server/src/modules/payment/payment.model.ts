import { model, Schema, Types } from "mongoose"
import type { Payment } from "./payment.schema.js"
import { PAYMENT_METHOD } from "../../constant/enum.constants.js"

//?==================================================================================
//? Payment Model
//?==================================================================================
const mongoPaymentSchema = new Schema<Payment>({
    userId: {
        type: Types.ObjectId,
        required: [true, "User ID is required"],
        ref: "user"
    },

    date: {
        type: Date,
        required: [true, "Date is required"],
    },

    amount: {
        type: Number,
        required: [true, "User ID is required"],
        ref: "user"
    },

    reference: {
        type: String,
        required: [true, "Reference ID is required"],
    },

    method: {
        type: String,
        required: [true, "User ID is required"],
        enum: { values: PAYMENT_METHOD, }
    },

}, {
    timestamps: true, versionKey: false
})

//*==== Payment Model ========================================================
export const PaymentModel = model<Payment>("Payment", mongoPaymentSchema)