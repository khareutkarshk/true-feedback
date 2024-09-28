import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schema/signUpSchema";


const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){

    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get("username")
        }

        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log("Result: ", result);

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []

            return Response.json({
                success: false,
                message: "Invalid username",
                errors: usernameErrors
            }, {status: 400})

        }

        const {username} = result.data

        const existingUser = await UserModel.findOne(
            {username, isVerified: true}
        )

        if(existingUser){
            return Response.json({
                success: false,
                message: "Username already exists"
            }, {status: 400})
        }

        return Response.json({
            success: true,
            message: "Username is unique"
        }, {status: 200})
        
    } catch (error) {
        console.error("Error checking username: ", error);

        return Response.json({
            success: false,
            message: "Error checking username"
        }, {status: 500})
    }
}