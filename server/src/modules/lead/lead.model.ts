import { Model, model, Schema } from "mongoose";
import { type Lead } from "./lead.schema.js";

//?==================================================================================
//? Lead Model
//?==================================================================================
const mongoLeadSchema = new Schema<Lead>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
        ref: "user"
    },

    date: { type: Date, required: [true, "Date is required"], default: Date.now },
    count: { type: Number, required: [true, "Count is required"] },
    rate: { type: Number, default: 8 }

}, { timestamps: true, versionKey: false })

//*==== Lead Model and Export ========================================================
export const LeadModel: Model<Lead> = model<Lead>("Lead", mongoLeadSchema)


