import type { User } from "./user.type.js"
import userRepository from "./user.repository.js"
import type { AuthUser } from "../../services/token.services.js"
import { ServerError } from "../../middleware/error.handler.middleware.js"

//?==================================================================================
//? User Services
//?==================================================================================
export class UserServices {
    //*==== Add ========================================================
    static async add(data: User) {
        const newUser = await userRepository.createOne(data)
        if (!newUser) ServerError.throwError("Registration failed", 400, "Server error")
        return newUser
    }

    //*==== Get All ========================================================
    static async getAll() {
        return userRepository.find({})

    }

    //*==== Get Single User ========================================================
    static async getSingle(id: string) {
        const user = await userRepository.findById(id)
        if (!user) ServerError.throwError("Invalid User ID", 500)
        return user
    }

    //*==== Update ========================================================
    static async update(id: string, data: Partial<User>) {
        const updatedUser = await userRepository.updateById(id, data)
        if (!updatedUser) ServerError.throwError("Invalid User ID", 400)
        return updatedUser
    }

    //*==== Delete ========================================================
    static async remove(id: string,) {
        const deleteddUser = await userRepository.deleteById(id)
        if (!deleteddUser) ServerError.throwError("Invalid User ID", 400)
        return deleteddUser
    }
}