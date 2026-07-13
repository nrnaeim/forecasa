import cors from "cors"
import morgan from "morgan"
import expres from "express";
import cookieParser from "cookie-parser"
import { router } from "./routes/routes.js";
import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middleware/error.handler.middleware.js";

//?==================================================================================
//? Server
//?==================================================================================
const server = expres()

//*==== Middlewares ========================================================
server.use(cors())
server.use(expres.json())
server.use(cookieParser())
server.use(morgan("combined"))
server.use(expres.urlencoded({ extended: true }))


//*==== Routes ========================================================
server.use("/api/v1", router)


//*==== Error Handler Middleware ========================================================
server.use(errorHandler)
server.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: "Opps! 404 resources not found" } as JsonRes)
})




export default server