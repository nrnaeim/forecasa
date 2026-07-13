import { Router } from "express";
import { AuthSchema } from "./auth.schema.js";
import { AuthControllers } from "./auth.controllers.js";
import { Middlewares } from "../../middleware/middleware.js";

//?==================================================================================
//? Auth Routes
//?==================================================================================
export const authRouter = Router()

//*==== Register ========================================================
authRouter.post("/login", Middlewares.validator(AuthSchema.login), AuthControllers.login)
authRouter.get("/me", Middlewares.authenticate, AuthControllers.me)
authRouter.get("/logout", AuthControllers.logout)
authRouter.get("/refresh", AuthControllers.refresh)
authRouter.post("/update_password", Middlewares.authenticate, Middlewares.validator(AuthSchema.updatePassword), AuthControllers.updatePassword)
authRouter.post("/forgot_password", Middlewares.validator(AuthSchema.forgotPassword), AuthControllers.forgotPassword)
authRouter.post("/reset_password/:token", Middlewares.validator(AuthSchema.resetPassword), AuthControllers.resetPassword)



