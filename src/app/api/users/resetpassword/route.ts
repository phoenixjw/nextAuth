import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User  from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

connect()

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {password, token} = reqBody
        console.log(password, token)



        // validate token
        const user = await User.findOne({forgotPasswordToken: token})
        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        console.log(user)

        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10)

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
    
        return NextResponse.json({
          message: "Password reset successfully",
          success: true,
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}