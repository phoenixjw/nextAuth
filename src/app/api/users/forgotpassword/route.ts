import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User  from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log(email)

        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
        user.forgotPasswordToken = token;
        user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000); // Expiry set to 1 hour from now
        await user.save();


        // send email

        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
          );
  
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}