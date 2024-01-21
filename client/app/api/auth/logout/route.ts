import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const url = process.env.BASE_URL + 'auth/login';
    console.log(url)
    cookies().delete('access_token');
    return NextResponse.redirect(url);
}