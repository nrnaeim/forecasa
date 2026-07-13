import argon2 from "argon2";
import crypto from "node:crypto";
import type { User } from "../user/user.type.js";
import { env } from "../../constant/env.constant.js";
import userRepository from "../user/user.repository.js";
import { MailService } from "../../services/mail.services.js";
import type { Login, UpdatePassword } from "./auth.schema.js";
import { RedisServices } from "../../services/redis.services.js";
import { ServerError } from "../../middleware/error.handler.middleware.js";
import { TokenServices, type AuthUser } from "../../services/token.services.js";


//?==================================================================================
//? Auth Services
//?==================================================================================
export class AuthServices {
    //*==== Login ========================================================
    static async login(data: Login) {
        const query = "email" in data
            ? { email: data.email }
            : { phone: data.phone }
        const user = await userRepository.findOneWithPassword(query)
        if (!user) ServerError.throwError("Invalid credentials", 400)
        const isSame = await user?.comparePassword(data.password)
        if (!isSame) ServerError.throwError("Invalid credentials", 400)
        const { id, name, email, role } = user
        const a_token = await TokenServices.sign({ id, name, email, role }, "access")
        const r_token = await TokenServices.sign({ id, name, email, role }, "refresh")
        return { id, name, email, role, a_token, r_token }
    }

    //*==== Me ========================================================
    static async me(id: string) {
        const me = await userRepository.findById(id)
        if (!me) ServerError.throwError("Something went wrong", 500)
        return me
    }

    //*==== Logout ========================================================
    static async logout(r_token: string) {
        const payload = await TokenServices.verify(r_token)
        const { exp, jti } = payload
        const expiryTime = new Date(exp).getTime()
        const now = Date.now()
        const remainTime = Math.max(Math.floor((expiryTime - now) / 1000), 0)
        await RedisServices.setWithExpiry(`blackList:${jti}`, "true", remainTime)
    }

    //*==== Refresh Token ========================================================
    static async refresh(r_token: string) {
        if (!r_token) ServerError.throwError("No refresh token is provided", 401)
        const payload = await TokenServices.verify(r_token)
        const { id, name, role, email, jti } = payload
        const isBlocked = await RedisServices.get(`blackList:${jti}`)
        if (isBlocked) ServerError.throwError("Token has revocked, Please login again", 401)
        return TokenServices.sign({ id, name, role, email, }, "access")
    }

    //*==== Update Password ========================================================
    static async updatePassword(id: string, data: UpdatePassword) {
        const existUser = await userRepository.findOneWithPassword({ _id: id })
        if (!existUser) ServerError.throwError("Something went wrong", 500)
        const isSame = await existUser.comparePassword(data.oldPassword)
        if (!isSame) ServerError.throwError("Wrong password", 400)
        const hash = await argon2.hash(data.password, { type: argon2.argon2id, secret: Buffer.from(env.ARGON2_SECRET) })
        const updatedUser = await userRepository.updateById(id, { password: hash })
        if (!updatedUser) ServerError.throwError("Something went wrong", 500)
        await MailService.send(existUser.email, "Update password", "Password uptade successful")
    }

    //*==== Forgot Password ========================================================
    static async forgotPassword(email: string) {
        const existUser = await userRepository.findOneWithPassword({ email })
        if (!existUser) ServerError.throwError("Password reset OTP has send to your email", 400)
        const token = crypto.randomBytes(32).toString("hex")
        const resetUrl = `${env.HOST}:${env.PORT}/api/v1/auth/reset_password/${token}`

        const hashToken = TokenServices.createHash(token)
        const ok = await RedisServices.setWithExpiry(`token:${hashToken}`, existUser.id, 3600)
        if (ok !== "OK") ServerError.throwError("Failed to send OTP", 500)

        const text = `Your password reset link is ${resetUrl},\nLink is valid for 1 hour`
        const info = await MailService.send(email, "Forgot password", text)
        if (!info) ServerError.throwError("Failed to send OTP", 500)
        if (info.accepted.length === 0) ServerError.throwError("Failed to send OTP", 500)
    }

    //*==== Reset Password ========================================================
    static async resetPassword(token: string, password: string) {
        const hashToken = TokenServices.createHash(token)
        const id = await RedisServices.get(`token:${hashToken}`)
        if (!id) ServerError.throwError("Token invalid or expired", 400)
        const hash = await argon2.hash(password, { type: argon2.argon2id, secret: Buffer.from(env.ARGON2_SECRET) })
        const updatedUser = await userRepository.updateById(id, { password: hash })
        if (!updatedUser) ServerError.throwError("Failed to update password", 500)
        await RedisServices.delete(`token:${hashToken}`)
    }
}

