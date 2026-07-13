import nodemailer from "nodemailer"
import { env } from "../constant/env.constant.js"

//?==================================================================================
//? Mail Services
//?==================================================================================
export class MailService {
    //*==== Transporter ========================================================
    private static transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
        }
    })

    //*==== Send Mail ========================================================
    static async send(email: string, subject: string, text: string) {
        const isConnected = await this.transporter.verify()
        if (!isConnected) return null
        return this.transporter.sendMail({
            from: env.SMTP_USER,
            to: email,
            subject: subject,
            text: text
        })

    }

}
