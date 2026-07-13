import z from "zod"
import { isValidObjectId, Types } from "mongoose"
import { INPUT_VALIDATION_MESSAGES as IVM } from "../../utils/validation.messages.utils.js"

//?==================================================================================
//? Lead Schema
//?==================================================================================
export class LeadSchema {
    private static userId = z.string(IVM.REQUIRE_TYPE("User ID", "string"))
        .refine((id) => isValidObjectId(id), "User ID must be valid Object ID")
        .transform(id => new Types.ObjectId(id))

    private static date = z.iso.date({ error: IVM.REQUIRE_TYPE("Date", "ISO date string") })
        .transform(date => new Date(date))

    private static count = z.coerce.number({ error: IVM.REQUIRE_TYPE("Count", "number") })
        .min(0, IVM.MIN_LENGTH("Count", 0))
        .max(500, IVM.MAX_LENGTH("Count", 500))

    private static rate = z.coerce.number()
        .min(0, IVM.MIN_VALUE("Rate", 0))
        .max(10, IVM.MAX_VALUE("Rate", 10))
        .default(8)

    //*==== Create ========================================================
    static create = z.object({
        userId: this.userId,
        date: this.date,
        count: this.count,
        rate: this.rate
    })

    //*==== Update ========================================================
    static update = z.object({
        userId: this.userId.optional(),
        date: this.date.optional(),
        count: this.count.optional(),
        rate: this.rate.optional()
    })
}


//*==== Lead type ========================================================
export type Lead = z.infer<typeof LeadSchema.create>
