import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async (req:NextRequest)=>{

    const session  = await getServerSession(authOptions);
    if(session.user)
    {
        return NextResponse.json({
        user:session.user
        },
        {
            status:200
        }
    )}

    return NextResponse.json({
        message:"Ypu are not logged in"
    },{
        status:400
    })
  
}