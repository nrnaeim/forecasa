import z from "zod"
import { isValidObjectId, Types } from "mongoose"
import { PAYMENT_METHOD } from "../../constant/enum.constants.js"
import { INPUT_VALIDATION_MESSAGES as IVM } from "../../utils/validation.messages.utils.js"


//?==================================================================================
//? Payment Schema
//?==================================================================================
export class PaymentSchema {
    private static userId = z.string({ error: IVM.REQUIRE_TYPE("User ID", "string") })
        .refine(id => isValidObjectId(id), "Must be a valid Object ID")
        .transform(id => new Types.ObjectId(id))

    private static date = z.iso.date({ error: IVM.REQUIRE_TYPE("Date", "ISO date string") })
        .transform((date) => new Date(date))

    private static amount = z.coerce.number({ error: IVM.REQUIRE_TYPE("Amount", "number") })
        .min(0, IVM.MIN_VALUE("Amount", 0))
        .max(0, IVM.MAX_VALUE("Amount", 5000))


    private static reference = z.string({ error: IVM.REQUIRE_TYPE("Reference", "string") })
        .min(5, IVM.MIN_LENGTH("Reference", 5))
        .max(50, IVM.MAX_LENGTH("Reference", 50))

    private static method = z.enum(PAYMENT_METHOD, { error: IVM.ENUM("Method", PAYMENT_METHOD) })
        .default("bKash")

    //*==== Create ========================================================
    static create = z.object({
        userId: this.userId,
        date: this.date,
        amount: this.amount,
        reference: this.reference,
        method: this.method
    })

    //*==== Update ========================================================
    static update = z.object({
        userId: this.userId.optional(),
        date: this.date.optional(),
        amount: this.amount.optional(),
        reference: this.reference.optional(),
        method: this.method.optional()
    })
}

//*==== Payment Type ========================================================
export type Payment = z.infer<typeof PaymentSchema.create>