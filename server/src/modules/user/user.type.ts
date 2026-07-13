import type { Role } from "../../constant/enum.constants.js"


//?==================================================================================
//? User Type Defination
//?==================================================================================
export interface User {
    _id: string,
    name: string
    email: string
    phone: string
    role: Role
    password: string
    isActive: boolean
    comparePassword: (rawPassword: string) => Promise<boolean>
}