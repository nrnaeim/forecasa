import z from "zod"
import { ROLE } from "../../constant/enum.constants.js"
import { INPUT_FIELD_LENGTH as IFL } from "../../constant/field.length.constant.js"
import { INPUT_VALIDATION_MESSAGES as IVM } from "../../utils/validation.messages.utils.js"


//?==================================================================================
//? User Schema
//?==================================================================================
export class UserSchema {
    //*==== Name ========================================================
    private static name = z
        .string({ error: IVM.REQUIRE_TYPE("Name", "string") })
        .min(IFL.USER.FIRST_NAME.MIN, IVM.MIN_LENGTH("Name", IFL.USER.FULL_NAME.MIN))
        .max(IFL.USER.FIRST_NAME.MAX, IVM.MAX_LENGTH("Name", IFL.USER.FULL_NAME.MAX))

    //*==== Email ========================================================
    private static email = z
        .email({ error: IVM.REQUIRE_TYPE("Email", "string") })
        .max(IFL.AUTH.EMAIL.MAX, IVM.MAX_LENGTH("Email", IFL.AUTH.EMAIL.MAX))
        .trim()

    //*==== Phone ========================================================
    private static phone = z.e164({ error: IVM.REQUIRE_TYPE("Phone", "string") })
        .trim()

    //*==== Role ========================================================
    private static role = z.enum(ROLE, { error: IVM.ENUM("Role", ROLE) })
        .default("user")

    //*==== Active ========================================================
    private static isActive = z.coerce.boolean({ error: IVM.TYPE("Is active", "boolean") }).default(true)

    //*==== Password ========================================================
    private static password = z.string({ error: IVM.REQUIRE_TYPE("Password", "string") })
        .min(IFL.AUTH.PASSWORD.MIN, IVM.MIN_LENGTH("Password", IFL.AUTH.PASSWORD.MIN))
        .max(IFL.AUTH.PASSWORD.MAX, IVM.MAX_LENGTH("Password", IFL.AUTH.PASSWORD.MAX))

    //*==== Confirm Password ========================================================
    private static confirmPassword = z.string({ error: IVM.REQUIRE_TYPE("Confirm password", "string") })
        .min(IFL.AUTH.PASSWORD.MIN, IVM.MIN_LENGTH("Confirm password", IFL.AUTH.PASSWORD.MIN))
        .max(IFL.AUTH.PASSWORD.MAX, IVM.MAX_LENGTH("Confirm password", IFL.AUTH.PASSWORD.MAX))


    //*==== Register User ========================================================
    static add = z.object({
        name: this.name,
        email: this.email,
        phone: this.phone,
        role: this.role,
        password: this.password,
        confirmPassword: this.confirmPassword
    }).refine((data) => data.password === data.confirmPassword, IVM.PASSWORD_MISMATCH)
        .transform(({ confirmPassword, ...rest }) => rest)


    //*==== Update User ========================================================
    static update = z.object({
        name: this.name,
        email: this.email,
        phone: this.phone,
        role: this.role,
        isActive: this.isActive,
    })
}




