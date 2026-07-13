import type { QueryFilter } from "mongoose";
import type { Lead } from "./lead.schema.js";
import { leadRepository } from "./lead.repository.js";
import type { AuthUser } from "../../services/token.services.js";
import { ServerError } from "../../middleware/error.handler.middleware.js";



//?==================================================================================
//? Lead Services
//?==================================================================================
export class LeadServices {
    //*==== Create Single  ========================================================
    static async create(data: Lead) {
        const newLead = await leadRepository.createOne(data)
        if (!newLead) ServerError.throwError("Failed to add", 500)
        return newLead
    }

    //*====  Get All  ========================================================
    static async getAll(user: AuthUser) {
        const { role, id } = user
        const isAdmin = ["admin", "super"].includes(role)
        const query: QueryFilter<Lead> = isAdmin ? {} : { userId: id }
        return leadRepository.find(query)
    }

    //*==== Get Single Lead  ========================================================
    static async getSingle(leadId: string, user: AuthUser) {
        const { role, id } = user
        const lead = await leadRepository.findById(leadId)
        if (!lead) ServerError.throwError("Invaild ID", 400)
        const isAdmin = ["admin", "super"].includes(role)
        if (isAdmin) return lead
        if (lead?.userId.toString() !== id) ServerError.throwError("Unauthorized", 403)
        return lead
    }

    //*==== Update Single Lead  ========================================================
    static async updateSingle(id: string, data: Partial<Lead>) {
        const updatedLead = await leadRepository.updateById(id, data)
        if (!updatedLead) ServerError.throwError("Invalid ID", 400)
        return updatedLead
    }

    //*==== Delete Single Lead  ========================================================
    static async deleteSingle(id: string) {
        const deletedLead = await leadRepository.deleteById(id)
        if (!deletedLead) ServerError.throwError("Invalid ID", 400)
        return deletedLead
    }

}