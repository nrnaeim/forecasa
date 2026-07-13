import type { Lead } from "./lead.schema.js";
import type { RequestHandler } from "express";
import { LeadServices } from "./lead.services.js";

//?==================================================================================
//? Lead Controllers
//?==================================================================================
export class LeadControllers {

    //*==== Create Single  ========================================================
    static create: RequestHandler = async (req, res, next) => {
        const newLead = await LeadServices.create(req.body)
        res.status(201).json({
            success: true,
            message: "Lead added successfully",
            data: newLead
        } as JsonRes)
    }

    //*====  Get All  ========================================================
    static getAll: RequestHandler = async (req, res, next) => {
        const leads = await LeadServices.getAll(req.user)
        res.status(200).json({
            success: true,
            message: "Leads fetched successfully",
            data: leads
        } as JsonRes)
    }

    //*==== Get Single Lead  ========================================================
    static getSingle: RequestHandler<{ id: string }> = async (req, res, next) => {
        const lead = await LeadServices.getSingle(req.params.id, req.user)
        res.status(200).json({
            success: true,
            message: "Lead fetched successfully",
            data: lead
        } as JsonRes)

    }

    //*==== Update Single Lead  ========================================================
    static updateSingle: RequestHandler<{ id: string }, {}, Lead> = async (req, res, next) => {
        const updatedLead = await LeadServices.updateSingle(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Update successful",
            data: updatedLead
        } as JsonRes)
    }

    //*==== Delete Single Lead  ========================================================
    static deleteSingle: RequestHandler<{ id: string }> = async (req, res, next) => {
        const deletedLead = await LeadServices.deleteSingle(req.params.id)
        res.status(200).json({
            success: true,
            message: "Delete successful",
            data: deletedLead
        } as JsonRes)
    }

}