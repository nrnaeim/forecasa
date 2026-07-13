import { Model, type QueryFilter } from "mongoose";


//?==================================================================================
//? Base Repository
//?==================================================================================
export class BaseRepository<T> {
    constructor(protected model: Model<T>) { }

    //*==== Create One ========================================================
    async createOne(data: T) {
        return this.model.create(data)
    }

    //*==== Find by ID ========================================================
    async findById(id: string) {
        return this.model.findById(id)
    }

    //*==== Update by ID ========================================================
    async updateById(id: string, data: Partial<T>) {
        return this.model.findByIdAndUpdate(id, { $set: data }, { returnDocument: "after" })

    }
    //*==== Find one and Update ========================================================
    async findAndUpdate(filter: QueryFilter<T>, data: Partial<T>) {
        return this.model.findOneAndUpdate(filter, { $set: data }, { returnDocument: "after" })
    }

    //*==== Delete by ID ========================================================
    async deleteById(id: string) {
        return this.model.findByIdAndDelete(id)
    }

    //*==== Find ========================================================
    async find(query: QueryFilter<T>) {
        return this.model.find(query)
    }

}