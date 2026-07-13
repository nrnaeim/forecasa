import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { leadRouter } from "../modules/lead/lead.routes.js";
import { paymentRouter } from "../modules/payment/payment.routes.js";
import { userRouter } from "../modules/user/user.routes.js";

//?==================================================================================
//? Router
//?==================================================================================
export const router = Router()

//*==== Auth ========================================================
router.use("/auth", authRouter)
router.use("/leads", leadRouter)
router.use("/users", userRouter)
router.use("/payments", paymentRouter)







