import { Redis } from "ioredis"
import { ServerError } from "../middleware/error.handler.middleware.js";

//?==================================================================================
//? Redis Services
//?==================================================================================
export class RedisServices {
    //*==== Redis Client ========================================================
    private static client: Redis

    //*==== Connect ========================================================
    static async connect() {
        if (!this.client) {
            this.client = new Redis({})
            this.client.on("connect", () => "Redis connected")
            this.client.on("error", (err) => console.error("Redis Error:", err));
        }
    }

    //*==== Is Connected ========================================================
    static isConnected() {
        if (!this.client) ServerError.throwError("Something went wrong", 500)
    }

    //*==== Set ========================================================
    static async set(key: string, value: string | number) {
        this.isConnected()
        return await this.client.set(key, String(value))
    }

    //*==== Set with Expiry ========================================================
    static async setWithExpiry(key: string, value: string | number, time: number = 300) {
        this.isConnected()
        await this.delete(key)
        return await this.client.setex(key, time, String(value),)
    }

    //*==== Get ========================================================
    static async get(key: string) {
        this.isConnected()
        return await this.client.get(key)
    }

    //*==== Delete ========================================================
    static async delete(key: string) {
        this.isConnected()
        return await this.client.del(key)
    }
}