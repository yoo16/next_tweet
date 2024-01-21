import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const authorization = await request.headers.get('Authorization')
    const bearer = authorization?.split(" ")[1];
    if (bearer) cookies().set('access_token', bearer);
    console.log("api/auth/login:", bearer);
    return NextResponse.json({ bearer });
}