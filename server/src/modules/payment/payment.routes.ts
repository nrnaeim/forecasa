import { Router } from "express"
import { Middlewares } from "../../middleware/middleware.js"
import { PaymentControllers } from "./payment.controllers.js"
import { PaymentSchema } from "./payment.schema.js"

//?==================================================================================
//? Payment Router
//?==================================================================================
export const paymentRouter = Router()

paymentRouter.use(Middlewares.authenticate)

//*==== Routes ========================================================
paymentRouter.route("/")
    .post(Middlewares.authorize("admin", "super"), PaymentControllers.create)
    .get(PaymentControllers.getAll)

paymentRouter.route("/:id")
    .get(PaymentControllers.getSingle)
    .patch(Middlewares.authorize("admin", "super"), Middlewares.validator(PaymentSchema.update), PaymentControllers.updateSingle)
    .delete(Middlewares.authorize("admin", "super"), PaymentControllers.deleteSingle)