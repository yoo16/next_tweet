// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './app/services/UserService';
import { useContext } from 'react';
import UserContext from './app/context/UserContext';

export async function middleware(req: NextRequest) {
    console.log('--- middleware ---');
    const url = process.env.BASE_URL + "auth/login";
    const token = req.cookies.get('access_token');
    console.log('middleware:', token);
    if (!token) {
        return NextResponse.redirect(url);
    } else {
        const res = NextResponse.next();
        return res;
    }
}

export const config = {
    // matcher: ["/((?!auth|api).*)"],
    matcher: ["/", "/user/:path*"]
};