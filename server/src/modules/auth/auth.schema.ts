import z from "zod"
import { INPUT_FIELD_LENGTH as IFL } from "../../constant/field.length.constant.js";
import { INPUT_VALIDATION_MESSAGES as IVM } from "../../utils/validation.messages.utils.js";


//?==================================================================================
//? Auth Schema
//?==================================================================================
export class AuthSchema {
    //*==== Email ========================================================
    protected static email = z
        .email({ error: IVM.REQUIRE_TYPE("Email", "string") })
        .max(IFL.AUTH.EMAIL.MAX, IVM.MAX_LENGTH("Email", IFL.AUTH.EMAIL.MAX))
        .trim()

    //*==== Phone ========================================================
    protected static phone = z.e164({ error: IVM.REQUIRE_TYPE("Phone", "string") })
        .trim()

    //*==== Password ========================================================
    protected static password = z.string({ error: IVM.REQUIRE_TYPE("Password", "string") })
        .min(IFL.AUTH.PASSWORD.MIN, IVM.MIN_LENGTH("Password", IFL.AUTH.PASSWORD.MIN))
        .max(IFL.AUTH.PASSWORD.MAX, IVM.MAX_LENGTH("Password", IFL.AUTH.PASSWORD.MAX))

    //*==== Confirm Password ========================================================
    protected static confirmPassword = z.string({ error: IVM.REQUIRE_TYPE("Confirm password", "string") })
        .min(IFL.AUTH.PASSWORD.MIN, IVM.MIN_LENGTH("Confirm password", IFL.AUTH.PASSWORD.MIN))
        .max(IFL.AUTH.PASSWORD.MAX, IVM.MAX_LENGTH("Confirm password", IFL.AUTH.PASSWORD.MAX))

    //*==== Old Password ========================================================
    protected static oldPassword = z.string({ error: IVM.REQUIRE_TYPE("Old password", "string") })
        .min(IFL.AUTH.PASSWORD.MIN, IVM.MIN_LENGTH("Old password", IFL.AUTH.PASSWORD.MIN))
        .max(IFL.AUTH.PASSWORD.MAX, IVM.MAX_LENGTH("Old password", IFL.AUTH.PASSWORD.MAX))


    //*==== OTP ========================================================
    protected static otp = z.string({ error: IVM.REQUIRE_TYPE("OTP", "string") })
        .length(IFL.AUTH.OTP.LENGTH, IVM.EXACT_LENGTH("OTP", IFL.AUTH.OTP.LENGTH))


    //*==== Login ========================================================
    static login = z.xor([
        z.object({
            email: this.email,
            password: this.password
        }),
        z.object({
            phone: this.phone,
            password: this.password
        })
    ])

    //*==== Update Password ========================================================
    static updatePassword = z.object({
        oldPassword: this.oldPassword,
        password: this.password,
        confirmPassword: this.password
    }).refine(
        data => data.password === data.confirmPassword,
        "Confirm password mismatch"
    ).transform(({ oldPassword, password }) => ({ oldPassword, password }))

    //*==== Reset Password ========================================================
    static forgotPassword = z.object({
        email: this.email,
    })

    //*==== Verify OTP ========================================================
    static resetPassword = z.object({
        password: this.password,
        confirmPassword: this.confirmPassword
    }).refine(data => data.password === data.confirmPassword,
        "Confirm password mismatch"
    ).transform(({ confirmPassword, password }) => ({ password }))
}

//?==================================================================================
//? Auth Types
//?==================================================================================
export type Login = z.infer<typeof AuthSchema.login>
export type UpdatePassword = z.infer<typeof AuthSchema.updatePassword>
export type ForgotPassword = z.infer<typeof AuthSchema.forgotPassword>
export type ResetPassword = z.infer<typeof AuthSchema.resetPassword>
