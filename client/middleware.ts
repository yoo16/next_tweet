// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './app/services/UserService';
import { User } from './app/models/User';

export async function middleware(req: NextRequest) {
    console.log('--- middleware ---')
    const url = process.env.BASE_URL + "auth/login";
    const token = req.cookies.get('access_token');
    if (!token) return NextResponse.redirect(url);

    const user:User = await getUser(token?.value as string) as User;
    if (!user?.accessToken) {
        return NextResponse.redirect(url);
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/", "/user/:path*", "/user/:slug*"]
};