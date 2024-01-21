// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const url = process.env.BASE_URL + "auth/login";
    const token = await req.cookies.get('access_token');
    if (!token) {
        return NextResponse.redirect(url);
    } else {
        return NextResponse.next();
    }
}

export const config = {
    // matcher: ["/((?!auth|api).*)"],
    matcher: ["/", "/user/:path*"]
};