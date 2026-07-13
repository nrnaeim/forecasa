import argon2 from "argon2";
import { model, Schema } from "mongoose";
import type { User } from "./user.type.js";
import { ROLE } from "../../constant/enum.constants.js";
import { env } from "../../constant/env.constant.js";


//?==================================================================================
//? Mongoose User Schema
//?==================================================================================
const mongoUserSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true

    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },

    role: {
        type: String,
        required: true,
        enum: ROLE,
        default: "user"
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    isActive: {
        type: Boolean,
        default: true
    }


}, { versionKey: false, timestamps: true })

//*==== Hashing Password ========================================================
mongoUserSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await argon2.hash(this.password, {
        type: argon2.argon2id,
        secret: Buffer.from(env.ARGON2_SECRET)
    })
})

//*==== Compare Password ========================================================
mongoUserSchema.method("comparePassword", async function (rawPassword: string) {
    return argon2.verify(this.password, rawPassword, { secret: Buffer.from(env.ARGON2_SECRET) })
})

//*==== User Model ========================================================
const UserModel = model<User>("user", mongoUserSchema)
export default UserModel
