import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        // checks if token is there
        const token = request.cookies.get("token")?.value || "";

        // .verify() is used to check tokens but also can be used to extract data from the token
        // Declaring 'any' here isn't best practise but done for ease of use
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
        
    }
}


