import crypto from "node:crypto"
import { env } from "../constant/env.constant.js"
import type { Role } from "../constant/enum.constants.js"
import { V4 as paseto, type ProduceOptions } from "paseto"



//?==================================================================================
//? Types
//?==================================================================================
export type AuthUser = {
    id: string,
    name: string,
    email: string,
    role: Role,
    exp: string,
    subject: "access" | "refresh"
    jti: string,
}
//?==================================================================================
//? Token Services
//?==================================================================================
export class TokenServices {
    //*==== Sign Token ========================================================
    static async sign(payload: Partial<AuthUser>, type: "access" | "refresh") {
        const key = Buffer.from(env.PRIVATE_KEY, "base64url")
        const prodRefresh = env.NODE_ENV === "prod" && type === "refresh"
        const prodAccess = env.NODE_ENV === "prod" && type === "access"
        const devRefresh = env.NODE_ENV === "dev" && type === "refresh"
        const options: ProduceOptions = {
            expiresIn: prodRefresh ? "15d" : devRefresh ? "30d" : prodAccess ? "15m" : "1d",
            subject: type,
            jti: crypto.randomUUIDv7()
        }
        const token = await paseto.sign(payload, key, options)
        return token.split("v4.public.")[1]
    }

    //*==== Verify Token ========================================================
    static async verify(token: string): Promise<AuthUser> {
        const key = Buffer.from(env.PUBLIC_KEY, "base64url")
        token = `v4.public.${token}`
        return paseto.verify(token, key)
    }

    //*==== Hash ========================================================
    static createHash(token: string) {
        return crypto.createHmac("sha256", env.PRIVATE_KEY).update(token).digest("hex")
    }

    //*==== Verify Hash ========================================================
    static verifyHash(token: string, hash: string) {
        return hash === crypto.createHmac("sha256", env.PRIVATE_KEY).update(token).digest("hex")
    }

}