// export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    // console.log('--- middleware ---')
    // const url = process.env.BASE_URL + "auth/login";
    // const token = req.cookies.get('access_token');
    // if (!token) {
    //     return NextResponse.redirect(url);
    // } else {
    //     return NextResponse.next();
    // }
}

export const config = {
    // matcher: ["/((?!auth|api|images|.js|.css).*)"],
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    matcher: ["/", "/user/:path*", "/user/:slug*"]
};