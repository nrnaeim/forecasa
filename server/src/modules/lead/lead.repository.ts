import type { Model } from "mongoose";
import { LeadModel } from "./lead.model.js";
import type { Lead } from "./lead.schema.js";
import { BaseRepository } from "../../repository/base.repository.js";

//?==================================================================================
//? Lead Repository
//?==================================================================================
export class LeadRepository<T> extends BaseRepository<T> {
    constructor(model: Model<T>) {
        super(model)
    }

}


export const leadRepository = new LeadRepository<Lead>(LeadModel)
