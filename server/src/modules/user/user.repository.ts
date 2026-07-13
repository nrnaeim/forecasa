import UserModel from './user.model.js';
import type { User } from './user.type.js';
import { Model, type QueryFilter } from 'mongoose';
import { BaseRepository } from "../../repository/base.repository.js";


//?==================================================================================
//? User Repository
//?==================================================================================
class UserRepository<T> extends BaseRepository<T> {
    constructor(protected model: Model<T>) {
        super(model)
    }

    //*==== Find One with Password ========================================================
    async findOneWithPassword(query: QueryFilter<T>) {
        return this.model.findOne(query).select("+password")
    }

}
const userRepository = new UserRepository<User>(UserModel)
export default userRepository


