import z, { safeParse } from "zod"
import { INPUT_VALIDATION_MESSAGES as IVM } from "../utils/validation.messages.utils.js"

//?==================================================================================
//? Environment Variables
//?==================================================================================
const envSchema = z.object({
    PORT: z.coerce.number(IVM.REQUIRE("PORT")),
    HOST: z.coerce.string(IVM.REQUIRE("HOST")),
    ALLOWED_ORIGIN: z.coerce.string(IVM.REQUIRE("ALLOWED_ORIGIN")),
    MONGO_URI: z.coerce.string(IVM.REQUIRE("MONGO_URI")),
    ARGON2_SECRET: z.coerce.string(IVM.REQUIRE("ARGON2_SECRET")),
    PRIVATE_KEY: z.coerce.string(IVM.REQUIRE("PRIVATE_KEY")),
    PUBLIC_KEY: z.coerce.string(IVM.REQUIRE("PUBLIC_KEY")),
    NODE_ENV: z.enum(["dev", "prod"], IVM.ENUM("NODE_ENV", ["dev", "prod"])),
    SMTP_USER: z.coerce.string(IVM.REQUIRE("SMTP_USER")),
    SMTP_PASS: z.coerce.string(IVM.REQUIRE("SMTP_PASS"))
})

const { data, success, error } = safeParse(envSchema, process.env)

if (!success) {
    const errors = error.issues.map(e => e.message)
    console.log('=========== Missing Environment Variables ===========')
    console.log(errors.join(", "))
    console.log('=========== Missing Environment Variables ===========')
    process.exit(1)
}

export const env = data
