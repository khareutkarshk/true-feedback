import {resend} from "@/lib/resend"
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        const mail = await resend.emails.send({
            from: "khareu550@utkarshkhare.me",
            to: email,
            subject: "Verify your email",
            react: VerificationEmail({username, otp: verifyCode})
        })

        if(mail.error){
            console.log("Error sending email: ", mail.error)
            return {success: false, message: "Error sending email"}
        }        
        return {success: true, message: "Verifaication email sent successfully"}
        
    } catch (emailError) {
        console.error("Error sending email: ", emailError)
        return {success: false, message: "Error sending email"}
    }
}