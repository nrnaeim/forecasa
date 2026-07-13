import { Router } from "express";
import { Middlewares } from "../../middleware/middleware.js";
import { UserControllers } from "./user.controllers.js";
import { UserSchema } from "./user.schema.js";

//?==================================================================================
//? User Router
//?==================================================================================
export const userRouter = Router()


userRouter.use(Middlewares.authenticate, Middlewares.authorize("super", "admin"))

//*==== Routes ========================================================
userRouter.route("/")
    .post(Middlewares.validator(UserSchema.add), UserControllers.add)
    .get(UserControllers.getAll)

userRouter.route("/:id")
    .get(UserControllers.getSingle)
    .patch(Middlewares.validator(UserSchema.update), UserControllers.update)
    .delete(UserControllers.delete)
