import { Router } from "express";
import { LeadSchema } from "./lead.schema.js";
import { LeadControllers } from "./lead.controllers.js";
import { Middlewares } from "../../middleware/middleware.js";

//?==================================================================================
//? Lead Router
//?==================================================================================
export const leadRouter = Router()

//*==== Middlewares ========================================================
leadRouter.use(Middlewares.authenticate)

//*==== Routes ========================================================
leadRouter.route("/")
    .post(Middlewares.authorize("super", "admin"), Middlewares.validator(LeadSchema.create), LeadControllers.create)
    .get(LeadControllers.getAll)

leadRouter.route("/:id")
    .get(LeadControllers.getSingle)
    .patch(Middlewares.authorize("super", "admin"), Middlewares.validator(LeadSchema.update), LeadControllers.updateSingle)
    .delete(Middlewares.authorize("super", "admin"), LeadControllers.deleteSingle)