// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

import { getUser } from './app/services/UserService';
import { User } from './app/models/User';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token');
    console.log('middleware:', token);
    if (!token) {
        const url = process.env.BASE_URL + "auth/login";
        return NextResponse.redirect(url);
    } else {
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    // matcher: ["/((?!auth|api).*)"],
    matcher: "/user/:path*",
};