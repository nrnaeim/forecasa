import "dotenv/config.js"
import mongoose from "mongoose"
import server from "./server.js"
import { env } from "./constant/env.constant.js"
import { RedisServices } from "./services/redis.services.js"


//?==================================================================================
//? Inisitaing Server
//?==================================================================================
mongoose.connect(env.MONGO_URI)
    .then(async ({ connection }) => {
        console.log(`DB connected to ${connection.host}`)
        server.listen(env.PORT, () => { console.log(`Server listening on  ${env.HOST}:${env.PORT}`) })
        await RedisServices.connect()
    })
    .catch(error => {
        console.log(`=======================================`)
        console.log(error)
        console.log(`=======================================`)
        process.exit(1)
    })






